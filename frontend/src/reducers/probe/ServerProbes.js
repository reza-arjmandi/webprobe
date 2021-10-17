import { ServerProbes as ServerProbesDataAccess } from '../../data_access';
import { toast_success } from '../../toast';
import {
    ADD_SERVER_PROBE,
    LOAD_SERVER_PROBES,
    DELETE_SERVER_PROBE,
    UPDATE_PROBE_SETTINGS
} from '../../constants/action_types';

export default function ServerProbes(state = {}, action) {
    switch (action.type) {
        case LOAD_SERVER_PROBES:
            return action.probes;
        case ADD_SERVER_PROBE:
            {
                const updated_state = { ...state, [action.probe.id]: action.probe };
                ServerProbesDataAccess.save(updated_state);
                toast_success(`The probe ${action.probe.id} is added.`);
                return updated_state;
            }
        case DELETE_SERVER_PROBE:
            {
                let updated_state = {};
                Object.keys(state).forEach((element) => {
                    if (element === action.id) {
                        return;
                    }
                    updated_state[element] = state[element];
                });
                ServerProbesDataAccess.save(updated_state);
                return updated_state;
            }
        case UPDATE_PROBE_SETTINGS:
            {
                let updated_state = {};
                Object.keys(state).forEach((element) => {
                    if (element === action.id) {
                        let new_elem = state[element];
                        new_elem.data_size = action.data_size;
                        new_elem.type = action.probe_type;
                        updated_state[element] = new_elem;
                        return;
                    }
                    updated_state[element] = state[element];
                });
                ServerProbesDataAccess.save(updated_state);
                return updated_state;
            }
        default:
            return state;
    }
}