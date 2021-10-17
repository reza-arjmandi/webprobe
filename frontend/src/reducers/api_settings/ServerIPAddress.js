import {
    SET_API_IP_ADDRESS,
    LOAD_BACKEND_INFO
} from '../../constants/action_types';

import { DEFAULT_API_IP_ADDRESS } from '../../constants/api_settings';

export default function ServerIPAddress(state = DEFAULT_API_IP_ADDRESS, action) {
    switch (action.type) {
        case LOAD_BACKEND_INFO:
            return action.ip;
        case SET_API_IP_ADDRESS:
            return action.server_ip;
        default:
            return state;
    }
}