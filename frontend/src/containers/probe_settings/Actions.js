import {
    update_graph_settings,
    update_probe_settings
} from '../../actions/probe_settings';

export const get_actions = dispatch => ({
    save_graph_settings: (id, setting) => dispatch(update_graph_settings(id, setting)),
    update_probe: ({ id, data_size, probe_type }) => dispatch(update_probe_settings({ id, data_size, probe_type }))
});