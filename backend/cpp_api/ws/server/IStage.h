#pragma once

#include <memory>

#include "IBufferView.h"

using namespace std;

namespace ws
{

    class IStage
    {

    public:

        virtual ~IStage() = default;

        virtual void process(shared_ptr<ws::IBufferView> buffer) = 0; 
        virtual void stop() = 0;

    };

}
