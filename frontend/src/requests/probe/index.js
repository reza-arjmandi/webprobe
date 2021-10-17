import {
    PROBE_BASE_URI,
} from '../../constants/server';

export const make_server_probe_request = ({ probe_id, size }) => {
    return {
        uri: `${PROBE_BASE_URI}/${probe_id}`,
        method: "get",
        size
    };
}