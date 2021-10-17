#pragma once

#include <string>
#include <optional>

#include <boost/json.hpp>


namespace ws
{

    namespace bjson = boost::json;

    namespace JSONUtils
    {

        inline optional<bjson::value> get_nullable_value(
            bjson::value parsed_req, const string& key)
        {
            try
            {
                auto val{ parsed_req.at(key) };
                return val;
            }
            catch (...)
            {
                return nullopt;
            }
        }

        template<typename T>
        inline optional<T> get_nullable_type(
            bjson::value parsed_req, const string& key)
        {
            try
            {
                auto val{ parsed_req.at(key) };
                return bjson::value_to<T>(val);
            }
            catch (...)
            {
                return nullopt;
            }
        }

        template<typename T>
        inline optional<T> nullable_value_to(bjson::value val)
        {
            try
            {
                return bjson::value_to<T>(val);
            }
            catch (...)
            {
                return nullopt;
            }
        }
    }

}
