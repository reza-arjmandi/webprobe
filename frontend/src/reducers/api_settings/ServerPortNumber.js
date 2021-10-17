import {
    SET_API_PORT_NUMBER,
    LOAD_BACKEND_INFO
} from '../../constants/action_types';
import { DEFAULT_API_PORT } from '../../constants/api_settings';

export default function ServerPortNumber(state = DEFAULT_API_PORT, action) {
    switch (action.type) {
        case LOAD_BACKEND_INFO:
            return action.port;
        case SET_API_PORT_NUMBER:
            return action.server_port;
        default:
            return state;
    }
}