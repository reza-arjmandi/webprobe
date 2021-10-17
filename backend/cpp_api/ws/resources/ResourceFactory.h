#pragma once

#include "IResourceFactory.h"
#include "Resource.h"

namespace ws
{

	class ResourceFactory : public IResourceFactory
	{

	public:
		
		shared_ptr<IResource> create() final
		{
			return make_shared<Resource>();
		}

	};

}
