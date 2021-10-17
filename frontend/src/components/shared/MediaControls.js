import React from 'react';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';

import { toast_info } from '../../toast';

export default function MediaControls(props) {
  const {
    next_snapshot,
    is_loading,
    play_stream,
    is_playing_stream,
    pause_stream,
    open_setting,
    delete_item,
    disabled,
  } = props;

  if (disabled) {
    return (
      <div>
        <IconButton color="primary" disabled>
          <PlayArrowIcon fontSize="medium" onClick={() => { play_stream() }} />
        </IconButton>
        <IconButton color="primary" disabled>
          <SkipNextIcon fontSize="medium" onClick={() => { next_snapshot() }} />
        </IconButton>
        <IconButton color="primary" disabled>
          <SettingsIcon fontSize="medium" onClick={() => { open_setting() }} />
        </IconButton>
        <IconButton color="primary" disabled>
          <DeleteIcon
            fontSize="medium"
            onClick={
              () => { delete_item ? delete_item() : toast_info('There is no delete functionality.') }
            }
          />
        </IconButton>
      </div>)
  }

  const pause_or_play = () => {
    return (
      <IconButton color="primary">
        {is_playing_stream
          ? <PauseIcon fontSize="medium" onClick={() => { pause_stream() }} />
          : <PlayArrowIcon fontSize="medium" onClick={() => { play_stream() }} />
        }
      </IconButton>
    );
  };

  const skip_or_progress = () => {
    return (
      <IconButton color="primary">
        {!is_loading && 
          <SkipNextIcon fontSize="medium" onClick={() => { next_snapshot() }} />
        }
        {is_loading && <CircularProgress />}
      </IconButton>
    );
  }

  const setting = () => {
    return (
      <IconButton color="primary">
        <SettingsIcon fontSize="medium" onClick={() => { open_setting() }} />
      </IconButton>
    );
  }

  const delete_ = () => {
    return (
      <IconButton color="primary">
        <DeleteIcon
          fontSize="medium"
          onClick={
            () => { delete_item ? delete_item() : toast_info('There is no delete functionality.') }
          }
        />
      </IconButton>
    );
  }

  return (
    <div>
      {!is_loading && pause_or_play()}
      {!is_playing_stream && skip_or_progress()}
      {!is_loading && !is_playing_stream && setting()}
      {!is_loading && !is_playing_stream && delete_()}
    </div>
  );
}