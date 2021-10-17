#pragma once

#include "IResource.h"
#include "IResourceVisitor.h"

namespace ws
{

	class IResourceFinder: public IResourceVisitor {

	public:

		virtual ~IResourceFinder() = default;

		virtual IResource* found() = 0;

	};

}