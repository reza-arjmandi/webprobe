import { SET_IS_LOADING } from '../../constants/action_types';

export default function IsLoading(state = false, action) {
    switch (action.type) {
        case SET_IS_LOADING:
            return true;
        case 'REDUX_WEBSOCKET::WEBSOCKET_DISCONNECT':
        case 'REDUX_WEBSOCKET::CLOSED':
        case 'REDUX_WEBSOCKET::BROKEN':
        case 'REDUX_WEBSOCKET::BEGIN_RECONNECT':
        case 'REDUX_WEBSOCKET::RECONNECT_ATTEMPT':
        case 'REDUX_WEBSOCKET::ERROR':
        case 'REDUX_WEBSOCKET::MESSAGE':
            return false;
        default:
            return state;
    }
}