#pragma once

#include <string>
#include <vector>
#include <memory>

#include "ws/resources/IResourceRequestObserver.h"
#include "ws/resources/IResourceHandler.h"
#include "ws/resources/ResourceStatusCodes.h"
#include "ws/resources/IResource.h"
#include "ws/resources/IResourceFactory.h"
#include "ws/resources/BoundedBuffer.h"
#include "ws/resources/JSONUtils.h"

namespace ws
{

    namespace bjson = boost::json;
    using namespace std;

    class GraphResourceHandler 
        : public IResourceHandler
        , public enable_shared_from_this<GraphResourceHandler>
    {

    public:

        GraphResourceHandler(
            shared_ptr<IResourceFactory> resource_factory,
            shared_ptr<BoundedBuffer<float>> buffer) :
            _buffer{ buffer }
        {
            _resource = resource_factory->create();
            _resource->add_method_handler(
                string{ "get" },
                [&](bjson::value parsed_req) {
                    return get(parsed_req);
                }
            );
        }

        shared_ptr<IResource> as_resource() final
        {
            _resource->register_resource_handler(
                shared_from_this());
            return _resource;
        }

        void add_observer(
            shared_ptr<IResourceRequestObserver> observer)
        {
            _observers.push_back(observer);
        }

        void remove_observer()
        {
            _observers.pop_back();
        }

    private:

        void notify_observers(int size_)
        {
            for (auto& observer : _observers)
            {
                observer->request_resource(size_);
            }
        }

        bool is_size_valid(int size_)
        {
            return size_ >= 0;
        }

        bjson::value make_response(
            vector<float>& data,
            int size_)
        {
            return bjson::value{
                {"data", bjson::value_from(data)},
                {"uri", _resource->get_absoulte_path().generic_string() },
                {"size", bjson::value_from(size_)},
                {"status", static_cast<int>(ResourceStatusCodes::Successful)}
            };
        }

        bjson::value make_error_response(
            ws::ResourceStatusCodes status,
            string err_desc)
        {
            return bjson::value{
                    {"uri", _resource->get_absoulte_path().generic_string() },
                    {"status", static_cast<int>(status) },
                    {"error_description", err_desc}
            };
        }

        template<class T>
        bjson::value make_error_response(
            ws::ResourceStatusCodes status,
            string err_desc,
            T size_)
        {
            return bjson::value{
                    {"uri", _resource->get_absoulte_path().generic_string() },
                    {"status", static_cast<int>(status) },
                    {"error_description", err_desc},
                    {"size", size_}
            };
        }

        vector<float> take_snapshot_from_buffer(int size_)
        {
            notify_observers(size_);
            vector<float> vals(size_);
            int res_idx{ 0 };
            for (int idx = 0; idx < size_; idx++)
            {
                float elem;
                _buffer->pop_back(&elem);
                vals[res_idx++] = elem;
            }
            return vals;
        }

        bjson::value get(
            bjson::value parsed_req)
        {
            auto size_val_opt{ 
                JSONUtils::get_nullable_value(parsed_req, "size")
            };
            if (size_val_opt == nullopt)
            {
                return make_error_response(
                    ResourceStatusCodes::ExpectationFailed,
                    "Get request for graph resource should specify size.");
            }

            auto size_val{ 
                JSONUtils::nullable_value_to<int>(size_val_opt.value())
            };
            if (size_val == nullopt)
            {
                return make_error_response(
                    ResourceStatusCodes::ExpectationFailed,
                    "Requested graph size is not an integer. "
                    "The size should be an integer.",
                    size_val_opt.value());
            }

            auto size_{ size_val.value() };
            if (!is_size_valid(size_))
            {
                return make_error_response(
                    ResourceStatusCodes::RangeNotSatisfiable,
                    "Requested graph size is not in a valid integer. "
                    "The size should be greater than 0.",
                    bjson::value_from(size_));
            }
            return make_response(
                take_snapshot_from_buffer(size_),
                size_);
        }

        shared_ptr<IResource> _resource;
        shared_ptr<BoundedBuffer<float>> _buffer;
        vector<shared_ptr<IResourceRequestObserver>> _observers;

    };

}
