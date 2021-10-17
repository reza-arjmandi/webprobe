#pragma once

#include <memory>

#include "IBufferFactory.h"
#include "CircularBuffer.h"
#include "BufferConfig.h"

using namespace std;

namespace ws
{

    class BufferFactory : public IBufferFactory
    {

    public:

        shared_ptr<IBuffer> create() final
        {
            return make_shared<CircularBuffer>(_config);
        }

    private:

        shared_ptr<ws::BufferConfig> _config{
            make_shared<ws::BufferConfig>()};

    };

}
