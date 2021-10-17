import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useHistory } from "react-router-dom";

export default function MenuItems(debug_detector_mode){
  let history = useHistory();

  return(
    <div>
      <ListItem button onClick={()=>history.push("/probes")} >
        <ListItemIcon>
          <LocationSearchingIcon />
        </ListItemIcon>
        <ListItemText primary="Probes" />
      </ListItem>
    </div>
  );

}

