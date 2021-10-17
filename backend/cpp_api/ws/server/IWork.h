#pragma once

#include <memory>
#include <functional>

#include "IBufferView.h"

using namespace std;

namespace ws
{

	class IWork
	{

	public:

		virtual ~IWork() = default;

		virtual void exec(shared_ptr<ws::IBufferView> view) = 0;
		virtual void next(function<void(shared_ptr<ws::IBufferView>)>) = 0;
		virtual void stop() = 0;

	};

}
