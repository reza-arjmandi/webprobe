#pragma once

#include <vector>
#include <memory>

#include "ws/resources/IReleaseWaitNeeded.h"

namespace ws
{

	using namespace std;

	class ReleaseWaits
	{

	public:

		void add(shared_ptr<IReleaseWaitNeeded> release_needed)
		{
			release_needs.push_back(release_needed);
		}

		void release_all()
		{
			for (auto& elem : release_needs) {
				elem->release_wait();
			}
		}
	
	private:

		vector<shared_ptr<IReleaseWaitNeeded>> release_needs;
	};

}