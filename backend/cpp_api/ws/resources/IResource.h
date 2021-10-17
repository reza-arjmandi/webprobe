#pragma once

#include <string>
#include <memory>
#include <functional>
#include <optional>
#include <filesystem>

#include <boost/json.hpp>

namespace bjson = boost::json;

namespace ws
{

	using namespace std;
	using namespace std::filesystem;

	class IResourceVisitor;
	class IResourceHandler;

	class IResource
	{

	public:

		using HandlerType = function<bjson::value(bjson::value)>;

		virtual ~IResource() = default;

		virtual optional<HandlerType> get_method_handler(string& method) const= 0;
		virtual void add_method_handler(string& method, HandlerType handler) = 0;
		virtual void accept(shared_ptr<IResourceVisitor> visitor) = 0;
		virtual path get_absoulte_path() const= 0;
		virtual string get_name() const= 0;
		virtual void set_name(string&) = 0;
		virtual void add_child(shared_ptr<IResource> resource) = 0;
		virtual vector<shared_ptr<IResource>> get_children() const= 0;
		virtual void set_parent(weak_ptr<IResource> parent) = 0;
		virtual weak_ptr<IResource> get_parent() const= 0;
		virtual void register_resource_handler(shared_ptr<IResourceHandler> handler) = 0;

	};

}
