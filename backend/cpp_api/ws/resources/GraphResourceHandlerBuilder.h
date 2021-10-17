#pragma once

#include "GraphResourceHandler.h"
#include "ws/resources/ResourceFactory.h"

namespace ws
{

    class GraphResourceHandlerBuilder
    {

    public:

        GraphResourceHandlerBuilder& buffer(
            shared_ptr<BoundedBuffer<float>> buffer)
        {
            _buffer = buffer;
            return *this;
        }

        GraphResourceHandlerBuilder& observer(
            shared_ptr<IResourceRequestObserver> observer_)
        {
            _observers.push_back(observer_);
            return *this;
        }

        GraphResourceHandlerBuilder& name(string name)
        {
            _name = name;
            return *this;
        }

        shared_ptr<GraphResourceHandler> build()
        {
            auto result{ make_shared<GraphResourceHandler>(_resource_factory, _buffer) };
            result->as_resource()->set_name(_name);
            for (auto& obs : _observers)
            {
                result->add_observer(obs);
            }
            return result;
        }

    private:

        string _name;
        shared_ptr<BoundedBuffer<float>> _buffer;
        shared_ptr<ResourceFactory> _resource_factory{ 
            make_shared<ResourceFactory>() 
        };
        vector<shared_ptr<IResourceRequestObserver>> _observers;

    };

}