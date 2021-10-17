#pragma once

#include "IResourceHandler.h"
#include "Resource.h"

namespace ws
{

	class DirResourceHandler : public IResourceHandler
	{

	public:

		shared_ptr<IResource> as_resource() final
		{
			return _resource;
		}

	private:

		shared_ptr<Resource> _resource{ make_shared<Resource>() };

	};

}
