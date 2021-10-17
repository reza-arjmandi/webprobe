import * as React from 'react';

import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import Title from '../shared/Title';
import ProbeTypeSelect from '../shared/ProbeTypeSelect';

export default function GraphSetting(props) {
  const {
    title,
    y_min,
    y_max,
    x_min,
    x_max,
    height,
    play_speed,
    save,
    back,
    probe_type,
    probe_data_size,
    update_probe
  } = props;

  const [type, set_type] = React.useState(probe_type);
  const [data_size, set_data_size] = React.useState(probe_data_size);
  const [values, setValues] = React.useState({
    y_min: y_min,
    y_max: y_max,
    x_min: x_min,
    x_max: x_max,
    height: height,
    play_speed: play_speed
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: parseInt(event.target.value) });
  };

  const handle_type_change = (obj) => {
    set_type(obj.target.value)
  }

  const handle_data_size_change = (obj) => {
    set_data_size(obj.target.value)
  }

  return (
    <Stack spacing={1}>
      <Title>{title} Settings</Title>
      <Stack direction="row">
        <FormControl sx={{ m: 1 }} variant="filled">
          <FilledInput
            id="filled-adornment-weight"
            value={values.y_min}
            onChange={handleChange('y_min')}
            aria-describedby="Y min"
            type="number"
            inputProps={{
              'aria-label': 'Y min',
            }}
          />
          <FormHelperText id="filled-weight-helper-text">Y min</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="filled">
          <FilledInput
            id="filled-adornment-weight"
            value={values.y_max}
            onChange={handleChange('y_max')}
            aria-describedby="Y max"
            type="number"
            inputProps={{
              'aria-label': 'Y max',
            }}
          />
          <FormHelperText id="filled-weight-helper-text">Y max</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="filled">
          <FilledInput
            id="filled-adornment-weight"
            value={values.height}
            onChange={handleChange('height')}
            aria-describedby="Y max"
            type="number"
            inputProps={{
              'aria-label': 'Height',
            }}
          />
          <FormHelperText id="filled-weight-helper-text">Height</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="filled">
          <FilledInput
            id="play_speed_input_id"
            value={values.play_speed}
            onChange={handleChange('play_speed')}
            aria-describedby="Play Speed"
            endAdornment={<InputAdornment position="start">ms</InputAdornment>}
            type="number"
            inputProps={{
              'aria-label': 'play_speed',
            }}
          />
          <FormHelperText id="play_speed_helper_text">Play Speed</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="filled">
          <FilledInput
            id="data_size_input_id"
            value={data_size}
            onChange={handle_data_size_change}
            aria-describedby="Data size"
            type="number"
            inputProps={{
              'aria-label': 'data_size',
            }}
          />
          <FormHelperText id="data_size_helper_text">Data Size</FormHelperText>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2}>
        <ProbeTypeSelect
          type={type}
          handle_type_change={handle_type_change}
        />
        {type === "probe_2d" &&
          <div>
            <FormControl sx={{ m: 1 }} variant="filled">
              <FilledInput
                id="filled-adornment-weight"
                value={values.x_min}
                onChange={handleChange('x_min')}
                aria-describedby="X min"
                type="number"
                inputProps={{
                  'aria-label': 'X min',
                }}
              />
              <FormHelperText id="filled-weight-helper-text">X min</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="filled">
              <FilledInput
                id="filled-adornment-weight"
                value={values.x_max}
                onChange={handleChange('x_max')}
                aria-describedby="X max"
                type="number"
                inputProps={{
                  'aria-label': 'X max',
                }}
              />
              <FormHelperText id="filled-weight-helper-text">X max</FormHelperText>
            </FormControl>
          </div>
        }
      </Stack>
      <Stack direction="row">
        <IconButton color="primary">
          <ArrowBackIcon fontSize="medium" onClick={back} />
        </IconButton>
        <IconButton color="primary">
          <SaveIcon fontSize="medium" onClick={
            () => {
              save({
                y_min: values.y_min,
                y_max: values.y_max,
                x_min: values.x_min,
                x_max: values.x_max,
                height: values.height,
                play_speed: values.play_speed,
              });
              update_probe({
                id: title,
                data_size,
                probe_type: type
              });
            }
          } />
        </IconButton>
      </Stack>
    </Stack>
  );
}
