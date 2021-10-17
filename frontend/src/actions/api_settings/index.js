import * as types from '../../constants/action_types';

export const load_api_settings = ({ip, port}) => ({
    type: types.LOAD_BACKEND_INFO,
    ip,
    port
});

export const set_api_ip_address = (server_ip) => ({
    type: types.SET_API_IP_ADDRESS,
    server_ip
});

export const set_api_port_number = (server_port) => ({
    type: types.SET_API_PORT_NUMBER,
    server_port
});