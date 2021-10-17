#pragma once

namespace ws
{

    using namespace std;

    class IResourceRequestObserver
    {

    public:

        virtual ~IResourceRequestObserver() = default;

        virtual void request_resource(size_t requested_size) = 0;

    };
}