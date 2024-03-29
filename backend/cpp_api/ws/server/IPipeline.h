#pragma once

#include "IStage.h"

namespace ws
{

	class IPipeline 
	{

	public:

		virtual ~IPipeline() = default;

		virtual shared_ptr<IStage> front() = 0;
		virtual void stop() = 0;

	};

}

