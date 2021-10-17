import * as types from '../../constants/action_types';

export const set_adding_probe_dialog_visibility = (visibility) => ({
    type: types.SET_ADDING_PROBE_DIALOG_VISIBILITY,
    visibility
});

export const add_server_probe = (probe) => ({
    type: types.ADD_SERVER_PROBE,
    probe
});

export const delete_server_probe = (id) => ({
    type: types.DELETE_SERVER_PROBE,
    id
});

export const load_server_probes = (probes) => ({
    type: types.LOAD_SERVER_PROBES,
    probes
});

export const play_probe_stream = (probe_id) => ({
    type: types.PLAY_PROBE_STREAM,
    probe_id
});

export const pause_probe_stream = () => ({
    type: types.PAUSE_PROBE_STREAM,
});

export const start_fetch_probe_snapshot = () => ({
    type: types.START_FETCH_PROBE_SNAPSHOT,
});
