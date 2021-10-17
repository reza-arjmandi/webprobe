#pragma once

#include <boost/asio.hpp>

#include "Types.h"

namespace ws
{

    class IBufferView
    {
        
    public:

        virtual ~IBufferView() = default;
        
        virtual bool is_authenticated() const = 0;
        virtual void set_authentication_result(bool result) = 0;
        virtual tcp_socket get_socket() = 0;
        virtual tcp_socket& get_socket_ref() = 0;
        virtual io_context& get_io_context() = 0;

    };

}

