import { send } from '@giantmachines/redux-websocket';
import {
    set_adding_probe_dialog_visibility,
    add_server_probe,
    delete_server_probe,
    play_probe_stream,
    pause_probe_stream
} from "../../actions/probe";
import {
    set_is_loading,
} from "../../actions";
import {
    make_server_probe_request
} from '../../requests/probe';
import {
    play_probe_stream_async
} from '../../stream';

export const get_actions = dispatch => ({
    open_adding_probe_dialog: () => { dispatch(set_adding_probe_dialog_visibility(true)) },
    close_adding_probe_dialog: () => { dispatch(set_adding_probe_dialog_visibility(false)) },
    add_probe: (probe) => { dispatch(add_server_probe(probe)) },
    delete_probe: (id) => { dispatch(delete_server_probe(id)) },
    play_stream: (id) => {
        dispatch(play_probe_stream(id));
        dispatch(play_probe_stream_async());
    },
    pause_stream: () => { dispatch(pause_probe_stream()) },
    next_snapshot: ({ probe_id, size }) => {
        dispatch(set_is_loading(true));
        dispatch(send(make_server_probe_request({ probe_id, size })));
    },
});