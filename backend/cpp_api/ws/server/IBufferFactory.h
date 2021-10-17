#pragma once

#include <memory>

#include "IBuffer.h"

using namespace std;

namespace ws
{

    class IBufferFactory
    {

    public:

        virtual ~IBufferFactory() = default;

        virtual shared_ptr<ws::IBuffer> create() = 0;

    };

}
