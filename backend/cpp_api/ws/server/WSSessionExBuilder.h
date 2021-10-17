#pragma once

#include "WSSessionEx.h"
#include "ws/resources/ResourceRouterBuilder.h"

namespace ws
{

    class WSSessionExBuilder
    {

    public:

        WSSessionExBuilder& resource_router(shared_ptr<ResourceRouter> router)
        {
            _resource_router = router;
            return *this;
        }
        
        shared_ptr<WSSessionEx> build()
        {
            return make_shared<WSSessionEx>(_resource_router);
        }

    private:

        shared_ptr<ResourceRouter> _resource_router{ 
            ResourceRouterBuilder().build() 
        };

    };

}