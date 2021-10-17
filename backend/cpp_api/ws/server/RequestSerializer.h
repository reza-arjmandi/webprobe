#pragma once

#include "IRequestSerializer.h"

namespace ws
{

    class RequestSerializer : public IRequestSerializer
    {

    public:

        string serialize(bjson::value data) final
        {
            return bjson::serialize(data);
        }

		bjson::value deserialize(string request) final
        {
            return bjson::parse(request);
        }

    };

}