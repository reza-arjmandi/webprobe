#pragma once

#include "IWork.h"
#include "WSEchoSession.h"

namespace ws
{

    class WSEchoSessionEx : public IWork
    {

    public:

        void exec(shared_ptr<ws::IBufferView> view) final
        {
            make_shared<WSEchoSession>(view->get_socket())->run();
        }

        void next(function<void(shared_ptr<ws::IBufferView>)>) final
        {
        }

    private:

    };

}
