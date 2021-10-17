import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function SelectItem(props) {
  const { items, change_item, label, current_item } = props;

  const handle_change = (event) => {
    change_item(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ minWidth: 120 }}>
      <Select
        labelId={label}
        id={label}
        color="primary"
        value={current_item}
        onChange={handle_change}
      >
        {
          items.map(
            (item, key) =>
              <MenuItem key={key} value={item}>
                {item}
              </MenuItem>
          )
        }
      </Select>
      <FormHelperText>{label}</FormHelperText>
    </FormControl>
  );
}
