import * as types from '../../constants/action_types';

export const update_graph_settings = (id, setting) => ({
    type: types.UPDATE_GRAPH_SETTINGS,
    id,
    setting
});

export const load_graph_settings = (settings) => ({
    type: types.LOAD_GRAPH_SETTINGS,
    settings
});

export const update_probe_settings = ({id, data_size, probe_type}) => ({
    type: types.UPDATE_PROBE_SETTINGS,
    id,
    data_size,
    probe_type
});
