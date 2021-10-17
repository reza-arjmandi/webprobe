#pragma once

#include <memory>

#include "IResource.h"

namespace ws
{

	using namespace std;

	class IResourceFactory
	{

	public:

		virtual ~IResourceFactory() = default;

		virtual shared_ptr<IResource> create() = 0;

	};

}
