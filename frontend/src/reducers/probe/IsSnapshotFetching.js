import {
    START_FETCH_PROBE_SNAPSHOT,
    PAUSE_PROBE_STREAM
} from '../../constants/action_types';
import { Successful } from '../../constants/status_codes';

export default function IsSnapshotFetching(state = false, action) {
    switch (action.type) {
        case START_FETCH_PROBE_SNAPSHOT:
            return true;
        case 'REDUX_WEBSOCKET::MESSAGE':
            const message = action.payload.message;
            if (message["status"] !== Successful) {
                return state;
            }
            return false;
        case PAUSE_PROBE_STREAM:
            return false;
        default:
            return state;
    }
}