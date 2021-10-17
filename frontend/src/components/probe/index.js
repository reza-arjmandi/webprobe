import * as React from 'react';
import { useHistory } from "react-router-dom";
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

import AddProbeDialog from './AddProbeDialog';
import { ProbeGraph } from './ProbeGraph';
import { DEFAUL_GRAPG_SETTING } from '../../constants/settings';

const fabStyle = {
  position: 'absolute',
  bottom: 25,
  right: 35,
};

export default function ServerProbePage(params) {
  const {
    probes,
    graph_settings,
    open_adding_probe_dialog,
    close_adding_probe_dialog,
    add_probe,
    is_adding_probe_dialog_open,
    delete_probe,
    next_snapshot,
    is_loading,
    probe_snapshots,
    play_stream,
    pause_stream,
    probe_on_stream
  } = params;
  let history = useHistory();

  const probe_graph = (data) => ProbeGraph(
    {
      ...data,
      play_stream: () => play_stream(data.id),
      pause_stream,
      open_setting: () => history.push(`/graph_setting/${data.id}`),
      delete: () => delete_probe(data.id),
      next_snapshot: () => {
        next_snapshot({ probe_id: data.id, size: data.data_size })
      },
      snapshot: probe_snapshots[data.id] ? probe_snapshots[data.id] : [],
      settings: graph_settings[data.id]
        ? graph_settings[data.id]
        : DEFAUL_GRAPG_SETTING,
      is_streaming: probe_on_stream === data.id,
      is_snapshot_loading: is_loading,
      controls_disabled: probe_on_stream === data.id
        ? false
        : probe_on_stream !== null
    }
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <AddProbeDialog
        is_open={is_adding_probe_dialog_open}
        close={close_adding_probe_dialog}
        add_probe={(probe) => {
          add_probe(probe);
          close_adding_probe_dialog();
        }}
      />
      <Stack spacing={2}>
        {Object.keys(probes).map((id) => probe_graph({ ...probes[id] }))}
      </Stack>
      <Fab sx={fabStyle} color="primary" aria-label="add">
        <AddIcon
          onClick={() => open_adding_probe_dialog()}
        />
      </Fab>
    </Container>
  );
}