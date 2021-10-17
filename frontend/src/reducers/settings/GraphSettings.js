import { GraphSettings as GraphSettingsDataAccess } from '../../data_access';
import {
    UPDATE_GRAPH_SETTINGS,
    LOAD_GRAPH_SETTINGS,
    DELETE_SERVER_PROBE
} from '../../constants/action_types';
import { toast_success } from '../../toast';

export default function GraphSettings(state = {}, action) {
    switch (action.type) {
        case UPDATE_GRAPH_SETTINGS:
            {
                const updated_state = { ...state, [action.id]: action.setting };
                GraphSettingsDataAccess.save(updated_state);
                toast_success(`Settings for ${action.id} is updated.`);
                return updated_state;
            }
        case LOAD_GRAPH_SETTINGS:
            return action.settings;
        case DELETE_SERVER_PROBE:
            {
                let updated_state = {};
                Object.keys(state).forEach((element) => {
                    if (element === action.id) {
                        return;
                    }
                    updated_state[element] = state[element];
                });
                GraphSettingsDataAccess.save(updated_state);
                return updated_state;
            }
        default:
            return state;
    }
}