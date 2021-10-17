#pragma once

#include <memory>

#include "resources/IResourceHandler.h"

namespace ws
{
	
	using namespace std;

	class IMicroService
	{

	public:

		virtual ~IMicroService() = default;

		virtual shared_ptr<IResourceHandler> get_resource_tree() = 0;
		virtual void start() = 0;
		virtual void stop() = 0;

	};

}
