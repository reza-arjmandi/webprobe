import {
    PLAY_PROBE_STREAM,
    PAUSE_PROBE_STREAM
} from '../../constants/action_types';

export default function PlayProbeStream(state = null, action) {
    switch (action.type) {
        case PLAY_PROBE_STREAM:
            return action.probe_id;
        case 'REDUX_WEBSOCKET::WEBSOCKET_DISCONNECT':
        case 'REDUX_WEBSOCKET::CLOSED':
        case 'REDUX_WEBSOCKET::BROKEN':
        case 'REDUX_WEBSOCKET::BEGIN_RECONNECT':
        case 'REDUX_WEBSOCKET::RECONNECT_ATTEMPT':
        case PAUSE_PROBE_STREAM:
            return null;
        default:
            return state;
    }
}