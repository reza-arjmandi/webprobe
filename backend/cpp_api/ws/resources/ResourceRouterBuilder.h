#pragma once

#include <utility>

#include "ResourceRouter.h"
#include "ResourceHandlerBuilder.h"
#include "ResourceFinderFactory.h"

#include "ws/server/RequestSerializer.h"

namespace ws
{

    class ResourceRouterBuilder
    {

    public:

        ResourceRouterBuilder& request_serializer(
            shared_ptr<RequestSerializer> serializer)
        {
            _request_serializer = serializer;
            return *this;
        }

        ResourceRouterBuilder& resource_tree(
            shared_ptr<IResource> res)
        {
            _tree_resource = res;
            return *this;
        }

        shared_ptr<ResourceRouter> build()
        {
            auto result{ make_shared<ResourceRouter>(
                _request_serializer, 
                make_shared<ResourceFinderFactory>()) 
            };
            result->set_resource_tree(_tree_resource);
            return result;
        }

    private:

        shared_ptr<IResource> _tree_resource;
        shared_ptr<RequestSerializer> _request_serializer{
            make_shared<RequestSerializer>()
        };

    };

}