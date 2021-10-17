import { send } from '@giantmachines/redux-websocket';

import {
  make_server_probe_request,
} from '../requests/probe';

import {
  start_fetch_probe_snapshot
} from '../actions/probe';

import {
  DEFAUL_GRAPG_SETTING
} from '../constants/settings';

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}

export function play_probe_stream_async() {

  return function (dispatch, getState) {
    let state = getState();
    if (state.PlayProbeStream === null) {
      return;
    }
    const delay_ = state.GraphSettings[state.PlayProbeStream]
      ? state.GraphSettings[state.PlayProbeStream].play_speed
      : DEFAUL_GRAPG_SETTING.play_speed;
    return delay(delay_)
      .then(function () {
        if (state.PlayProbeStream === null) {
          return;
        }
        if (!state.IsSnapshotFetching) {
          dispatch(start_fetch_probe_snapshot());
          dispatch(send(make_server_probe_request(
            {
              probe_id: state.PlayProbeStream,
              size: state.ServerProbes[state.PlayProbeStream].data_size
            }
          )));
        }

        dispatch(play_probe_stream_async());
      });

  }
}