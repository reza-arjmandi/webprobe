import * as types from '../constants/action_types';

export const set_is_loading = (is_loading) => ({
    type: types.SET_IS_LOADING,
    is_loading
});

export const clear_snapshots = () => ({
    type: types.CLEAR_SNAPSHOTS,
});
