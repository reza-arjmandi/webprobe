import { Successful } from '../../constants/status_codes';
import {
    ADD_SERVER_PROBE,
    LOAD_SERVER_PROBES,
    DELETE_SERVER_PROBE
} from '../../constants/action_types';
import { PROBE_BASE_URI } from '../../constants/server'

export default function ProbeSnapshots(state = {}, action) {
    switch (action.type) {
        case 'REDUX_WEBSOCKET::MESSAGE':
            {
                const message = action.payload.message;
                if (message["status"] !== Successful) {
                    return state;
                }

                let updated_state = {};
                Object.keys(state).forEach((element) => {
                    if (message["uri"] === `${PROBE_BASE_URI}/${element}`) {
                        updated_state[element] = message["data"];
                    }
                    else {
                        updated_state[element] = state[element];
                    }
                });
                return updated_state;
            }
        case LOAD_SERVER_PROBES:
            {
                let updated_state = {};
                Object.keys(action.probes).forEach((element) => {
                    updated_state[element] = [];
                });
                return updated_state;
            }
        case ADD_SERVER_PROBE:
            {
                const updated_state = { ...state };
                updated_state[action.probe.id] = [];
                return updated_state;
            }
        case DELETE_SERVER_PROBE:
            {
                let updated_state = {};
                Object.keys(state).forEach((element) => {
                    if (state[element] === action.id) {
                        return;
                    }
                    updated_state[element] = state[element];
                });
                return updated_state;
            }
        default:
            return state;
    }
}