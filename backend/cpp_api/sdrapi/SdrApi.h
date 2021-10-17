#pragma once

#define ENABLE_SDR_API

#ifdef ENABLE_SDR_API	

#include "ws/WsApi.h"
#include "sdrapi/service/ServerService.h"

inline shared_ptr<WsApi> sdr_app{ nullptr };
inline shared_ptr<ServerService> _server_service;

#define INIT_SDR_API() \
sdr_app = make_shared<WsApi>(); \
_server_service = make_shared<ServerService>(); \
sdr_app->register_service(_server_service); \
sdr_app->start(); \

#define STOP_SDR_API() \
sdr_app->stop(); \

#define FEED_GRAPH_PROBE(name, data, len) \
_server_service->get_probe_buffering(#name)->buffer(data, len); \

#else

#define INIT_SDR_API()

#define STOP_SDR_API()

#define FEED_GRAPH_PROBE(name, data, len)

#endif


