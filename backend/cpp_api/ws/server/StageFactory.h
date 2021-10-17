#pragma once

#include <memory>

#include "IStageFactory.h"
#include "Stage.h"

using namespace std;

namespace ws
{

    class StageFactory : public IStageFactory
    {

    public:

        shared_ptr<ws::IStage> create(shared_ptr<IWork> work)
        {
            return make_shared<ws::Stage>(work);
        }

    };

}
