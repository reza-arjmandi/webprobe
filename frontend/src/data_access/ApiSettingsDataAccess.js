import {
    DEFAULT_API_IP_ADDRESS,
    DEFAULT_API_PORT,
    API_IP_ADDRESS_SETTING_KEY,
    API_PORT_SETTING_KEY
} from '../constants/api_settings';

import DataAccess from './DataAccess';

export default class ApiSettingsDataAccess {

    constructor() {
        this.ApiIp = new DataAccess(
            {
                key: API_IP_ADDRESS_SETTING_KEY,
                default_value: DEFAULT_API_IP_ADDRESS
            }
        );
        this.ApiPort = new DataAccess(
            {
                key: API_PORT_SETTING_KEY,
                default_value: DEFAULT_API_PORT
            }
        );
    }

    load() {
        return {
            ip: this.ApiIp.load(false),
            port: this.ApiPort.load(false)
        };
    }

    save({ ip, port }) {
        this.ApiIp.save(ip, false);
        this.ApiPort.save(port, false);
    }

}