#pragma once

#include <memory>
#include <functional>

#include "IPipeline.h"

using namespace std;

namespace ws
{

	class IPipelineFactory 
	{

	public:

		virtual ~IPipelineFactory() = default;

		virtual shared_ptr<IPipeline> create(function<void()> push_buffer) = 0;

	};

}

