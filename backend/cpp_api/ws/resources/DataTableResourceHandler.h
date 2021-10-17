#pragma once

#include <string>
#include <array>
#include <memory>
#include <mutex>

#include "ws/resources/IResourceHandler.h"
#include "ws/resources/IResourceFactory.h"
#include "ws/resources/ResourceStatusCodes.h"
#include "ws/resources/Resource.h"
#include "ws/resources/JSONUtils.h"

namespace ws
{

    namespace bjson = boost::json;
    using namespace std;

    template<class RowType, size_t ColumnSize>
    class DataTableResourceHandler 
        : public IResourceHandler
        , public enable_shared_from_this<DataTableResourceHandler<RowType, ColumnSize>>
    {

    public:

        using TableHeadType = array<string, ColumnSize>;

        DataTableResourceHandler(
            shared_ptr<IResourceFactory> resource_factory,
            const TableHeadType& table_head) :
            _table_head{ table_head }
        {
            _resource = resource_factory->create();
            _resource->add_method_handler(
                string{ "get" },
                [&](bjson::value parsed_req) {
                    return get(parsed_req);
                }
            );
        }

        void add_row(const RowType& row)
        {
            lock_guard<mutex> guard{ _mutex };
            _rows.push_back(row);
        }

        shared_ptr<IResource> as_resource() final
        {
            _resource->register_resource_handler(
                shared_from_this());
            return _resource;
        }

    private:

        bool is_size_valid(int size_)
        {
            return size_ >= 0;
        }

        bjson::value make_response(
            vector<RowType>& data,
            int table_size)
        {
            return bjson::value{
                {"data", {
                    { "table_rows",  bjson::value_from(data) },
                    { "table_head",  bjson::value_from(_table_head) }
                }
                },
                {"uri", _resource->get_absoulte_path().generic_string() },
                {"size", bjson::value_from(data.size())},
                {"table_size", bjson::value_from(table_size)},
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

        vector<RowType> take_snapshot_from_buffer(int size_)
        {
            int result_size{ min(size_, static_cast<int>(_rows.size())) };
            vector<RowType> result(result_size);
            lock_guard<mutex> guard{ _mutex };
            copy(
                _rows.cbegin(), 
                _rows.cbegin() + result_size,
                result.begin());
            return result;
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
                    "Get request for data table resource should specify size.");
            }

            auto size_val{ 
                JSONUtils::nullable_value_to<int>(size_val_opt.value())
            };
            if (size_val == nullopt)
            {
                return make_error_response(
                    ResourceStatusCodes::ExpectationFailed,
                    "Requested data table size is not an integer. "
                    "The size should be an integer.",
                    size_val_opt.value());
            }

            auto size_{ size_val.value() };
            if (!is_size_valid(size_))
            {
                return make_error_response(
                    ResourceStatusCodes::RangeNotSatisfiable,
                    "Requested data table size is not in a valid integer. "
                    "The size should be greater than 0.",
                    bjson::value_from(size_));
            }
            return make_response(
                take_snapshot_from_buffer(size_),
                _rows.size());
        }

        vector<RowType> _rows;
        mutex _mutex;

        TableHeadType _table_head;
        shared_ptr<IResource> _resource;

    };

}
