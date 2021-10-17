#pragma once

#include <filesystem>

#include "ws/resources/IResourceFinder.h"

namespace ws
{
	class IResourceFinderFactory
	{

	public:

		virtual ~IResourceFinderFactory() = default;

		virtual shared_ptr<IResourceFinder> create(path uri) = 0;

	};
}
