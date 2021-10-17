#pragma once

#include <memory>
#include <atomic>
#include <algorithm>

#include "IResourceRequestObserver.h"
#include "IReleaseWaitNeeded.h"
#include "ws/resources/BoundedBuffer.h"

namespace ws
{

    using namespace std;

    template<class T>
    class ResourceBuffering : public IResourceRequestObserver, public IReleaseWaitNeeded
    {

    public:

        ResourceBuffering(size_t size_)
            : _buffer{
                make_shared<BoundedBuffer<T>>(size_) }
        {
        }


        void request_resource(size_t requested_size) final
        {
            _requested_size += requested_size;
        }

        void buffer(void* data, size_t len)
        {
            if (_requested_size <= 0)
            {
                return;
            }
            T* ptr_data{ static_cast<T*>(data) };
            size_t len_ = len / sizeof(T);
            size_t consume_len = (std::min)(_requested_size.load(), len_);
            std::for_each(ptr_data, ptr_data + consume_len, [&](auto& elem) {
                _buffer->push_front(elem);
            });
            _requested_size -= consume_len;
        }

        shared_ptr<BoundedBuffer<T>> get_buffer() const
        {
            return _buffer;
        }

        void release_wait() final
        {
            _buffer->release_wait();
        }

    private:

        shared_ptr<BoundedBuffer<T>> _buffer;
        atomic<size_t> _requested_size{ 0 };

        bool _buffering{ false };

    };

}