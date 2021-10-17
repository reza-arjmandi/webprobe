#pragma once

#include "DataTableResourceHandler.h"
#include "ws/resources/ResourceFactory.h"

namespace ws
{

    template<class RowType, size_t ColumnSize>
    class DataTableResourceHandlerBuilder
    {

    public:

        using ResourceHandlerType = DataTableResourceHandler<RowType, ColumnSize>;

        DataTableResourceHandlerBuilder& name(string name)
        {
            _name = name;
            return *this;
        }

        DataTableResourceHandlerBuilder& table_head(
            typename ResourceHandlerType::TableHeadType table_head)
        {
            _table_head = table_head;
            return *this;
        }

        shared_ptr<ResourceHandlerType> build()
        {
            auto result{ make_shared<ResourceHandlerType>(
                _resource_factory, _table_head) 
            };
            result->as_resource()->set_name(_name);
            return result;
        }

    private:

        string _name;
        shared_ptr<ResourceFactory> _resource_factory{ 
            make_shared<ResourceFactory>() 
        };
        typename ResourceHandlerType::TableHeadType _table_head;

    };

}