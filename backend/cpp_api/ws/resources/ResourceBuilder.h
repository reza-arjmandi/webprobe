#pragma once

#include "ws/resources/IResource.h"

namespace ws
{

	using namespace std;

	template<class T>
	class ResourceBuilder
	{

	public:

		ResourceBuilder& name(string name_)
		{
			_name = name_;
			return *this;
		}

		ResourceBuilder& child(shared_ptr<IResource> child)
		{
			_children.push_back(child);
			return *this;
		}

		ResourceBuilder& parent(weak_ptr<IResource> parent)
		{
			_parent = parent;
			return *this;
		}

		shared_ptr<T> build()
		{
			auto _resource_list{ make_shared<T>(_name) };
			_resource_list->set_parent(_parent);
			for (auto& child : _children)
			{
				child->set_parent(_resource_list);
				_resource_list->add_child(child);
			}
			return _resource_list;
		}

	private:

		string _name;
		vector<shared_ptr<IResource>> _children;
		weak_ptr<IResource> _parent;

	};

}