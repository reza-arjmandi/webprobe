#pragma once

#include <map>

#include "IResource.h"
#include "IResourceVisitor.h"

namespace ws
{

	class Resource : public IResource
	{

	public:

		optional<HandlerType> get_method_handler(string& method) const final
		{
			auto found{ _handlers.find(method) };
			if (found == _handlers.end())
			{
				return nullopt;
			}
			return found->second;
		}

		void add_method_handler(string& method, HandlerType handler) final
		{
			_handlers[method] = handler;
		}

		void accept(shared_ptr<IResourceVisitor> visitor) final
		{
			if (visitor->visit_resource(this)) {
				return;
			}

			for (auto& child : _children) {
				child->accept(visitor);
			}
		}

		path get_absoulte_path() const final
		{
			if (!_parent.expired()) {
				return _parent.lock()->get_absoulte_path() / path{ _name };
			}

			return path{ "/" } / path{ _name };
		}

		string get_name() const final
		{
			return _name;
		}

		void set_name(string& name) final
		{
			_name = name;
		}

		void add_child(shared_ptr<IResource> child) final
		{
			_children.push_back(child);
		}

		vector<shared_ptr<IResource>> get_children() const final
		{
			return _children;
		}

		void set_parent(weak_ptr<IResource> parent) final
		{
			_parent = parent;
		}

		weak_ptr<IResource> get_parent() const final
		{
			return _parent;
		}

		void register_resource_handler(shared_ptr<IResourceHandler> handler)
		{
			_res_handler = handler;
		}

	private:

		string _name{ "" };
		map<string, HandlerType> _handlers;
		weak_ptr<IResource> _parent;
		shared_ptr<IResourceHandler> _res_handler;
		vector<shared_ptr<IResource>> _children;

	};

}