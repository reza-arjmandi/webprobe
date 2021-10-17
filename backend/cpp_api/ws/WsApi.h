#pragma once

#include <memory>

#include "ws/resources/ResourceRouter.h"
#include "ws/server/TCPServer.h"
#include "ws/IMicroService.h"
#include "ws/resources/ResourceFactory.h"
#include "ws/resources/DirResourceHandler.h"
#include "ws/server/TCPServerBuilder.h"
#include "ws/server/WSSessionExBuilder.h"
#include "ws/resources/ResourceRouterBuilder.h"

using namespace std;

class WsApi
{

public:

	WsApi(string ip_address = "0.0.0.0", int port = 1234);
	~WsApi();

	void register_service(shared_ptr<ws::IMicroService> service);
	void start();
	void stop();

private:

	void init_resource_router();
	void init_server();
	void init_uri();

	string _ip_address;
	int _port;
	bool _started{ false };
	vector<shared_ptr<ws::IMicroService>> services;
	shared_ptr<ws::ResourceRouter> _resource_router;
	shared_ptr<ws::TCPServer> _server;
	shared_ptr<ws::IResourceHandler> _root_resource_tree;

};

inline WsApi::WsApi(
	string ip_address, int port)
	: _ip_address{ ip_address }
	, _port{ port }
{
	init_uri();
	init_resource_router();
	init_server();
}

inline WsApi::~WsApi()
{
	if (!_started)
	{
		return;
	}
	stop();
}

inline void WsApi::register_service(
	shared_ptr<ws::IMicroService> service)
{
	services.push_back(service);
	auto child_resource{ 
		service->get_resource_tree()->as_resource() 
	};
	auto root{ _root_resource_tree->as_resource() };
	child_resource->set_parent(root);
	root->add_child(child_resource);
}

inline void WsApi::start()
{
	if (_started)
	{
		return;
	}
	_server->run();
	for (auto& service : services) {
		service->start();
	}
	_started = true;
}

inline void WsApi::stop()
{
	if (!_started) {
		return;
	}
	_server->stop();
	for (auto& service : services) {
		service->stop();
	}
	_started = false;
}

inline void WsApi::init_uri()
{
	auto resource_factory{ make_shared<ws::ResourceFactory>() };
	_root_resource_tree =
		ws::ResourceHandlerBuilder<ws::DirResourceHandler>()
		.name("/")
		.build();
}

inline void WsApi::init_server()
{
	_server =
		ws::TCPServerBuilder()
		.address("0.0.0.0")
		.port(1234)
		.session_executor(
			ws::WSSessionExBuilder()
			.resource_router(_resource_router)
			.build())
		.authenticator(make_shared<ws::NoAuth>())
		.build();
}

inline void WsApi::init_resource_router()
{
	_resource_router =
		ws::ResourceRouterBuilder()
		.resource_tree(_root_resource_tree->as_resource())
		.build();
}
