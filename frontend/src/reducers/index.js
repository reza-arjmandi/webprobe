import { combineReducers } from 'redux';

import GraphSettings from './settings/GraphSettings';

import IsConnect from './api_settings/IsConnect';
import IsLoading from './shared/IsLoading';

import ServerIPAddress from './api_settings/ServerIPAddress';
import ServerPortNumber from './api_settings/ServerPortNumber';
import IsAddingProbeDialogOpen from './probe/IsAddingProbeDialogOpen';
import ServerProbes from './probe/ServerProbes';
import ProbeSnapshots from './probe/ProbeSnapshots';
import PlayProbeStream from './probe/PlayProbeStream';
import IsSnapshotFetching from './probe/IsSnapshotFetching';

const root_reducer = combineReducers({
    IsConnect,
    IsLoading,
    GraphSettings,
    ServerIPAddress,
    ServerPortNumber,
    IsAddingProbeDialogOpen,
    ServerProbes,
    ProbeSnapshots,
    PlayProbeStream,
    IsSnapshotFetching
});

export default root_reducer;
