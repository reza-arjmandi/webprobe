#pragma once

#include "ws/resources/IResourceHandler.h"

namespace ws
{

	using namespace std;

	template<class T>
	class ResourceHandlerBuilder
	{

	public:

		ResourceHandlerBuilder& name(string name_)
		{
			_name = name_;
			return *this;
		}

		ResourceHandlerBuilder& child(shared_ptr<IResourceHandler> child)
		{
			_children.push_back(child);
			return *this;
		}

		ResourceHandlerBuilder& parent(weak_ptr<IResourceHandler> parent)
		{
			_parent = parent;
			return *this;
		}

		template<typename... Uargs>
		shared_ptr<T> build(Uargs... Fargs)
		{
			auto _resource_list_handler{ make_shared<T>(Fargs...) };
			auto resource{ _resource_list_handler->as_resource() };
			//resource->set_parent(_parent->as_resource());
			resource->set_name(_name);
			for (auto& child : _children)
			{
				auto child_resource{ child->as_resource() };
				child_resource->set_parent(resource);
				resource->add_child(child_resource);
			}
			return _resource_list_handler;
		}

	private:

		string _name;
		vector<shared_ptr<IResourceHandler>> _children;
		weak_ptr<IResourceHandler> _parent;

	};

}