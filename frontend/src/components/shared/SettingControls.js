import React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import SyncIcon from '@mui/icons-material/Sync';

export default function SettingControls(props) {
  const {
    save,
    sync,
  } = props;
  return (
    <Stack direction="row">
      <IconButton color="primary" >
        <SaveIcon fontSize="medium" onClick={() => { save() }} />
      </IconButton>
      <IconButton color="primary">
        <SyncIcon fontSize="medium" onClick={() => { sync() }} />
      </IconButton>
    </Stack>
  )
}