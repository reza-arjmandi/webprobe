export default function IsConnect(state = false, action) {
    switch (action.type) {
        case 'REDUX_WEBSOCKET::OPEN':
            return true;
        case 'REDUX_WEBSOCKET::WEBSOCKET_DISCONNECT':
        case 'REDUX_WEBSOCKET::CLOSED':
        case 'REDUX_WEBSOCKET::BROKEN':
        case 'REDUX_WEBSOCKET::BEGIN_RECONNECT':
        case 'REDUX_WEBSOCKET::RECONNECT_ATTEMPT':
        case 'REDUX_WEBSOCKET::ERROR':
            return false;
        default:
            return state;
    }
}