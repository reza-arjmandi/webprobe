import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import DialogButtons from './DialogButtons';
import ProbeTypeSelect from '../shared/ProbeTypeSelect';

function make_id()
{
    const id_len = 5;
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxz';
    var characters_len = characters.length;
    for(var i = 0; i < id_len; i++)
    {
        result += characters.charAt(
          Math.floor(Math.random()*characters_len));
    }
    return result;
}

function AddDialog(props) {
  const [type, set_type] = React.useState("probe_1d");
  const [id, set_id] = React.useState(`probe_${make_id()}`);
  const [data_size, set_data_size] = React.useState(65536);
  const { on_close, open, add_probe } = props;

  const handle_type_change = (obj) => {
    set_type(obj.target.value)
  }
  const handle_id_change = (obj) => {
    set_id(obj.target.value)
  }
  const handle_data_size_change = (obj) => {
    if(type === "probe_2d") {
      set_data_size(parseInt(obj.target.value) * 2)
      return;
    }
    set_data_size(parseInt(obj.target.value))
  }

  return (
    <Dialog onClose={()=>on_close()} open={open}>
      <Stack spacing={2} margin={2}>
        <DialogTitle>Add a probe</DialogTitle>
        <TextField 
          id="outlined-basic" 
          defaultValue={id}
          label="Probe ID" 
          variant="outlined" 
          onChange={handle_id_change}
          required 
        />
        <ProbeTypeSelect 
          type={type}
          handle_type_change={handle_type_change}
        />
        <TextField 
          id="data_size" 
          defaultValue={data_size}
          label="Data Size" 
          variant="outlined" 
          onChange={handle_data_size_change}
          required 
        />
        <DialogButtons 
          add={()=>add_probe({ 
            id,
            title: id, 
            type,
            data_size,
          })}
          cancel={()=>on_close()}
        />
      </Stack>
    </Dialog>
  );
}

export default function AddProbeDialog(props) {
  const { is_open, close, add_probe } = props;

  return (
    <div>
      <AddDialog
        open={is_open}
        on_close={close}
        add_probe={add_probe}
      />
    </div>
  );
}
