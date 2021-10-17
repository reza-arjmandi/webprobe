import * as React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function DialogButtons(props) {
    const {add, cancel} = props;
    return (
        <Stack direction="row" spacing={1}>
            <Button 
                variant="outlined" 
                startIcon={<CloseRoundedIcon />}
                onClick={()=>cancel()}
            >
                Cancel
            </Button>
            <Button 
                variant="contained" 
                endIcon={<AddRoundedIcon />}
                onClick={()=>add()}
            >
                Add
            </Button>
        </Stack>
    );
}
