#pragma once

#include <atomic>
#include <functional>
#include <vector>

#include "ws/resources/IResourceHandler.h"
#include "ws/resources/IResource.h"
#include "ws/resources/IResource.h"
#include "ws/resources/IResourceFactory.h"
#include "ws/resources/ResourceStatusCodes.h"
#include "ws/resources/JSONUtils.h"

namespace ws
{
	namespace bjson = boost::json;

	class ToggleResourceHandler
		: public IResourceHandler
		, public enable_shared_from_this<ToggleResourceHandler>
	{

	public:

		using OnChangeHandlerType = function<void(bool)>;

		ToggleResourceHandler(
			shared_ptr<IResourceFactory> resource_factory)
		{
			_resource = resource_factory->create();
			_resource->add_method_handler(
				string{ "get" },
				[&](bjson::value parsed_req) {
					return get(parsed_req);
				}
			);
			_resource->add_method_handler(
				string{ "post" },
				[&](bjson::value parsed_req) {
					return post(parsed_req);
				}
			);
		}

		void operator+=(OnChangeHandlerType on_change)
		{
			_handlers.push_back(on_change);
		}

		void enable()
		{
			_is_enable = true;
		}

		void disable()
		{
			_is_enable = false;
		}

		shared_ptr<IResource> as_resource() final
		{
			_resource->register_resource_handler(
				shared_from_this());
			return _resource;
		}

	private:

		bjson::value make_response(bool data)
		{
			return bjson::value{
				{"is_enable", bjson::value_from(data)},
				{"uri", _resource->get_absoulte_path().generic_string() },
				{"status", static_cast<int>(ResourceStatusCodes::Successful)}
			};
		}

		bjson::value make_error_response(
			ws::ResourceStatusCodes status,
			string err_desc)
		{
			return bjson::value{
					{"uri", _resource->get_absoulte_path().generic_string() },
					{"status", static_cast<int>(status) },
					{"error_description", err_desc}
			};
		}

		bjson::value get(
			bjson::value parsed_req)
		{
			return make_response(_is_enable);
		}

		bjson::value post(
			bjson::value parsed_req)
		{
			auto is_enable_field{
				JSONUtils::get_nullable_value(parsed_req, "is_enable")
			};
			if (is_enable_field == nullopt)
			{
				return make_error_response(
					ws::ResourceStatusCodes::ExpectationFailed,
					"The post request should have is_enable field.");
			}
			auto is_enable_ =
				JSONUtils::nullable_value_to<bool>(is_enable_field.value());
			if (is_enable_ == nullopt)
			{
				return make_error_response(
					ws::ResourceStatusCodes::ExpectationFailed,
					"is_enable field should be a boolean.");
			}
			if (is_enable_.value() == true)
			{
				_is_enable = true;
				notify();
				return make_response(_is_enable);
			}
			_is_enable = false;
			notify();
			return make_response(_is_enable);
		}

		void notify()
		{
			for (const auto& handler : _handlers)
			{
				if (!handler) {
					continue;
				}
				handler(_is_enable);
			}
		}

		vector<OnChangeHandlerType> _handlers;
		atomic<bool> _is_enable{ false };
		shared_ptr<IResource> _resource;

	};

}
