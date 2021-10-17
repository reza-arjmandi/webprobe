import { connect as websock_conect } from '@giantmachines/redux-websocket';
import { disconnect as websock_disconnect } from '@giantmachines/redux-websocket';

export const get_actions = dispatch => ({
    ws_connect: (backend_ip, backend_port) => {
        dispatch(websock_conect(
            `ws://${backend_ip}:${backend_port}`
        ));
    },
    ws_disconnect: () => {
        dispatch(websock_disconnect());
    },
});