import {
    load_api_settings
} from '../actions/api_settings';

import {
    load_graph_settings,
} from '../actions/probe_settings';

import {
    load_server_probes,
} from '../actions/probe';

import {
    GraphSettings,
    ServerProbes,
    ApiSettings,
} from '../data_access'

export const load_store = (store) => {
    store.dispatch(load_graph_settings(
        GraphSettings.load()
    ));

    store.dispatch(load_server_probes(
        ServerProbes.load()
    ));

    store.dispatch(load_api_settings(
        ApiSettings.load())
    );
}