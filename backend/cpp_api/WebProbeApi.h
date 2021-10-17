#pragma once

#define ENABLE_SDR_API

#ifdef ENABLE_SDR_API	

#include "ws/WsApi.h"
#include "service/ProbeService.h"

inline shared_ptr<WsApi> sdr_app{ nullptr };
inline shared_ptr<ProbeService> _server_service;

#define INIT_PROBE_ID(probe_id) \
PROBE_SERVICE_PROBES_ID.insert(#probe_id); \

#define START_WEB_PROBE_API() \
sdr_app = make_shared<WsApi>(); \
_server_service = make_shared<ProbeService>(); \
sdr_app->register_service(_server_service); \
sdr_app->start(); \

#define STOP_WEB_PROBE_API() \
sdr_app->stop(); \

#define FEED_GRAPH_PROBE(name, data, len) \
_server_service->get_probe_buffering(#name)->buffer(data, len); \

#else

#define INIT_PROBE_ID(probe_id)

#define START_WEB_PROBE_API()

#define STOP_WEB_PROBE_API()

#define FEED_GRAPH_PROBE(name, data, len)

#endif


