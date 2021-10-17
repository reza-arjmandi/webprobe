import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ProbeTypeSelect(props) {
    const {
        type,
        handle_type_change,
    } = props;

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup
                row aria-label="probe_type"
                name="row-radio-buttons-group"
                value={type}
                onChange={handle_type_change}
            >
                <FormControlLabel value="probe_1d" control={<Radio />} label="1D" />
                <FormControlLabel value="probe_2d" control={<Radio />} label="2D" />
            </RadioGroup>
        </FormControl>
    );
}