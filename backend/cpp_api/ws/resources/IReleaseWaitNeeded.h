#pragma once

namespace ws
{

	class IReleaseWaitNeeded
	{

	public:

		virtual ~IReleaseWaitNeeded() = default;

		virtual void release_wait() = 0;

	};

}