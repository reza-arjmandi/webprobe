import { SET_ADDING_PROBE_DIALOG_VISIBILITY } from '../../constants/action_types';

export default function IsAddingProbeDialogOpen(state = false, action) {
    switch (action.type) {
        case SET_ADDING_PROBE_DIALOG_VISIBILITY:
            return action.visibility;
        default:
            return state;
    }
}