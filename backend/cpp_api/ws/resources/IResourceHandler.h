#pragma once

#include "IResource.h"

namespace ws
{

	class IResourceHandler
	{

	public:

		virtual ~IResourceHandler() = default;

		virtual shared_ptr<IResource> as_resource() = 0;

	};
}