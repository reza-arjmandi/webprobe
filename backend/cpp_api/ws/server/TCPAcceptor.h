#pragma once

#include <iostream>

#include "IWork.h"
#include "Types.h"

using namespace std;

namespace ws
{

    class TCPAcceptor : public IWork
    {

        int max_listen_connections = net::socket_base::max_listen_connections;

    public:

        TCPAcceptor(tcp_endpoint endpoint)
        {
            beast::error_code ec;
            _acceptor.open(endpoint.protocol(), ec);
            if(ec)
            {
                fail(ec, "open");
                return;
            }
            
            _acceptor.set_option(reuse_address(true), ec);
            if(ec)
            {
                fail(ec, "set_option");
                return;
            }
            _acceptor.bind(endpoint, ec);
            
            if(ec)
            {
                fail(ec, "bind");
                return;
            }

            _acceptor.listen(
                max_listen_connections, ec);
            
            if(ec)
            {
                fail(ec, "listen");
                return;
            }
        }
        
        void exec(shared_ptr<ws::IBufferView> view) final
        {
            boost::system::error_code ec;
            _acceptor.accept(view->get_socket_ref(), ec);
            if(!_next || ec)
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
            _acceptor.close();
        }

    private:

        void fail(beast::error_code ec, char const* what)
        {
            cerr << what << ": " << ec.message() << "\n";
        }

        io_context _ioc;
        tcp_acceptor _acceptor{ _ioc };
        function<void(shared_ptr<ws::IBufferView>)> _next{ nullptr };

    };

}
