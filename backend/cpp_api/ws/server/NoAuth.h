#pragma once

#include "IWork.h"

namespace ws
{

    class NoAuth : public IWork
    {

    public:

        void exec(shared_ptr<ws::IBufferView> view) final
        {
            view->set_authentication_result(true);
            if(!_next)
            {
                return;
            }
            _next(view);
        }

        void next(function<void(shared_ptr<ws::IBufferView>)> next_) final
        {
            _next = next_;
        }

        void stop() final
        {
        }

    private:

        function<void(shared_ptr<ws::IBufferView>)> _next{ nullptr };

    };

}
