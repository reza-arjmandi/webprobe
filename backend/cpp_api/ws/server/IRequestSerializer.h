#pragma once

#include <string>

#include <boost/json.hpp>

namespace bjson = boost::json;

namespace ws
{

	using namespace std;
	
	class IRequestSerializer
	{

	public:

		virtual ~IRequestSerializer() = default;

		virtual string serialize(bjson::value) = 0;
		virtual bjson::value deserialize(string request) = 0;

	};

}
