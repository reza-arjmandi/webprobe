#pragma once

#include <memory>

#include "Active.h"
#include "IWork.h"
#include "IStage.h"

using namespace std;

namespace ws
{

	class Stage : public IStage
	{

	public:

		Stage(shared_ptr<IWork> work, size_t num_threads = 1)
			: _work{ work },
			_active{ num_threads }
		{
		}

		void process(shared_ptr<ws::IBufferView> buffer) final 
		{
			_active.send([this, buffer]() mutable {
					_work->exec(buffer);
			});
		}

		void stop() final 
		{
			_work->stop();
			_active.stop();
		}

	private:

		shared_ptr<IWork> _work;
		ws::Active _active;

	};

}
