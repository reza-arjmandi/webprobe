#pragma once

#include "IResourceFinderFactory.h"
#include "ResourceFinder.h"

namespace ws
{

	class ResourceFinderFactory : public IResourceFinderFactory
	{

	public:

		shared_ptr<IResourceFinder> create(path uri) final
		{
			return make_shared<ResourceFinder>(uri);
		}

	};
}