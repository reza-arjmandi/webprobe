#pragma once

#include "IWork.h"

#include "WSSession.h"
#include "Active.h"
#include "ws/resources/IResourceRouter.h"
#include "ws/resources/BoundedBuffer.h"

namespace ws
{

    class WSSessionEx : public IWork
    {

    public:

        WSSessionEx(shared_ptr<IResourceRouter> resource_router)
        : _resource_router{ resource_router }
        {
        }

        void exec(shared_ptr<ws::IBufferView> view) final
        {
            make_shared<WSSession>(view->get_socket(), _resource_router)->run();
            _view = view;
            _active.send([&, view](){
                auto& io_ctx{ view->get_io_context() };
                io_ctx.run();
            }
            );
        }

        void next(function<void(shared_ptr<ws::IBufferView>)>) final
        {
        }

        void stop() final
        {
            if (_view) {
                _view->get_io_context().stop();
            }
            _active.stop();
        }


    private:

        shared_ptr<IResourceRouter> _resource_router; 
        shared_ptr<ws::IBufferView> _view{ nullptr };
        ws::Active _active;

    };

}
