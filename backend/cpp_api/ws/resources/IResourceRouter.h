#pragma once

#include "ws/resources/IResource.h"

namespace ws
{
	using namespace std;

	class IResourceRouter
	{

	public:

		virtual ~IResourceRouter() = default;

		virtual void set_resource_tree(shared_ptr<IResource> tree_resource) = 0;
		virtual std::string route(std::string uri) = 0;

	};

}
