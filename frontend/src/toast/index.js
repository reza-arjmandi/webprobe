import { toast } from 'react-toastify';
import {
    to_str
} from '../constants/status_codes';

export const toast_err_msg = (message) => {
    toast(
        `uri:${message["uri"]}\n
        status:${to_str(message["status"])}\n
        description:${message["error_description"]}`,
        {
            type: "error",
            position: "bottom-left"
        }
    );
}

export const toast_err = (message) => {
    toast(message,
        {
            type: "error",
            position: "bottom-left"
        }
    );
}

export const toast_info = (message) => {
    toast(message,
        {
            type: "info",
            position: "bottom-left"
        }
    );
}

export const toast_success = (message) => {
    toast(message,
        {
            type: "success",
            position: "bottom-left"
        }
    );
}