#pragma once
#include <filesystem>

#include "IResourceFinder.h"

namespace ws
{
	using namespace std;
	using namespace std::filesystem;

	class ResourceFinder : public IResourceFinder
	{

	public:

		ResourceFinder(path uri)
			:_uri{ uri }
		{
		}

		bool visit_resource(IResource* resource) final
		{
			if (resource->get_absoulte_path() == _uri)
			{
				_found = resource;
				return true;
			}
			return false;
		}

		IResource* found() final
		{
			return _found;
		}

	private:

		path _uri;
		IResource* _found{ nullptr };

	};

}