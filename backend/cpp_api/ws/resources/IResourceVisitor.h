#pragma once

#include "IResource.h"

namespace ws
{

	class IResourceVisitor {

	public:

		virtual ~IResourceVisitor() = default;

		virtual bool visit_resource(IResource*) = 0;

	};

}