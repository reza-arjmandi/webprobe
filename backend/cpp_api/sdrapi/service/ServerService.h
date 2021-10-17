#pragma once

#include "ws/IMicroService.h"
#include "ws/resources/DirResourceHandler.h"
#include "ws/resources/ResourceBuffering.h"
#include "ws/resources/ToggleResourceHandler.h"
#include "ws/resources/ResourceHandlerBuilder.h"
#include "ws/resources/GraphResourceHandlerBuilder.h"
#include "ws/resources/DataTableResourceHandler.h"
#include "ws/resources/DataTableResourceHandlerBuilder.h"
#include "sdrapi/probes.h"

class ServerService : public ws::IMicroService
{

public:

	shared_ptr<ws::ResourceBuffering<float>> get_probe_buffering(const string& probe_id);
	void start() final;
	void stop() final;
	shared_ptr<ws::IResourceHandler> get_resource_tree() final;

private:
		
	size_t _spect_size{ 65536 };
	size_t _buffering_size{ _spect_size * 100 };

	map<string, shared_ptr<ws::ResourceBuffering<float>>> _probes_buffer;

};

inline shared_ptr<ws::ResourceBuffering<float>> ServerService::get_probe_buffering(const string& probe_id)
{
	return _probes_buffer[probe_id];
}

inline void ServerService::start()
{
}

inline void ServerService::stop()
{
}

inline shared_ptr<ws::IResourceHandler> ServerService::get_resource_tree()
{
	auto resource_factory{ make_shared<ws::ResourceFactory>() };

	auto probes_resource = ws::ResourceHandlerBuilder<ws::DirResourceHandler>()
		.name("probes")
		.build();

	for (const auto& _1d_probe : SERVER_SERVICE_PROBES_ID) {
		auto buffer_ = make_shared<ws::ResourceBuffering<float>>(_buffering_size);
		_probes_buffer[_1d_probe] = buffer_;

		auto graph_resurce =
			ws::GraphResourceHandlerBuilder()
			.name(_1d_probe)
			.buffer(buffer_->get_buffer())
			.observer(buffer_)
			.build();

		auto resource{ probes_resource->as_resource() };
		auto child_resource{ graph_resurce->as_resource() };
		child_resource->set_parent(resource);
		resource->add_child(child_resource);
	}

	return ws::ResourceHandlerBuilder<ws::DirResourceHandler>()
		.name("server")
		.child(
			probes_resource
		)
		.build();
}