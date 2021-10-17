#pragma once

#include "ITCPServerDependencies.h"
#include "BufferFactory.h"
#include "PipelineFactory.h"
#include "StageFactory.h"
#include "Types.h"

namespace ws
{

    class TCPServerDependencies : public ITCPServerDependencies
    {

    public:

        TCPServerDependencies(
            tcp_endpoint endpoint, 
            shared_ptr<IWork> session_executor,
            shared_ptr<IWork> authenticator)
        : _pipeline_factory{ 
            endpoint, 
            session_executor, 
            authenticator}
        {
        }

        void set_endpoint(tcp_endpoint end_point) final
        {
            _end_point = end_point;
        }

        tcp_endpoint get_endpoint() const final
        {
            return _end_point;
        }

        ws::IBufferFactory& get_buffer_factory() final
        {
            return _buffer_factory;
        }

        ws::IPipelineFactory& get_pipeline_factory() final
        {
            return _pipeline_factory;
        }

    private:

        tcp_endpoint _end_point;
        ws::BufferFactory _buffer_factory;
        ws::PipelineFactory _pipeline_factory;
        ws::StageFactory _stage_factory;

    };

}
