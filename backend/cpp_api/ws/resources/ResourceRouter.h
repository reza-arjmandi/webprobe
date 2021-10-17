#pragma once

#include <string>
#include <filesystem>

#include <boost/json.hpp>

#include "IResourceRouter.h"
#include "IResource.h"
#include "IResourceFinder.h"
#include "IResourceFinderFactory.h"
#include "ResourceStatusCodes.h"

#include "ws/server/IRequestSerializer.h"

namespace ws
{

	class ResourceRouter: public IResourceRouter
	{

	public:

		ResourceRouter(
			shared_ptr<IRequestSerializer> serializer,
			shared_ptr<IResourceFinderFactory> finder_factory):
			_serializer{ serializer },
			_finder_factory{ finder_factory }
		{
		}

		void set_resource_tree(shared_ptr<IResource> tree_resource)
		{
			_tree_resource = tree_resource;
		}

		string route(string packet)
		{
			auto parsed{ _serializer->deserialize(packet) };
			auto str_uri{ bjson::value_to<string>(parsed.at("uri")) };
			auto uri{ path(str_uri) };
			_finder = _finder_factory->create(uri);
			_tree_resource->accept(_finder);
			auto resource{ _finder->found() };
			if (resource == nullptr)
			{
				bjson::value result = {
					{"uri", str_uri},
					{"status", 
						static_cast<int>(
							ResourceStatusCodes::NotFound) },
					{"error_description", 
						"Resource not found."},
				};
				return _serializer->serialize(result);
			}
			auto method{ bjson::value_to<string>(parsed.at("method")) };
			auto handler{ resource->get_method_handler(method) };
			if (!handler.has_value())
			{
				bjson::value result = {
					{"uri", str_uri},
					{"method", method},
					{"status", 
						static_cast<int>(
							ResourceStatusCodes::MethodNotAllowed) },
					{"error_description", 
						"Resource does not support get method."},
				};
				return _serializer->serialize(result);
			}
			return _serializer->serialize(
				handler.value()(parsed));
		}

	private:

		shared_ptr<IResourceFinder> _finder;
		shared_ptr<IResourceFinderFactory> _finder_factory;
		shared_ptr<IResource> _tree_resource;
		shared_ptr<IRequestSerializer> _serializer;

	};

}
