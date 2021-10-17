import { ApiSettings } from '../../data_access'
import {
    set_api_ip_address,
    set_api_port_number,
} from "../../actions/api_settings";
import { toast_success } from '../../toast';

export const get_actions = dispatch => ({
    set_api_ip_address: (server_ip) => {
        dispatch(set_api_ip_address(server_ip));
    },
    set_api_port_number: (server_port) => {
        dispatch(set_api_port_number(server_port));
    },
    save: (data) => {
        ApiSettings.save({
            ip: data.server_ip,
            port: data.server_port,
        });
        toast_success("IP and Port is successfully saved.");
    },
});