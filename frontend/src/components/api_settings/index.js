import * as React from 'react';
import { useHistory } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from '../shared/Title';

export default function ApiSettingsPage(params) {
  const { 
    server_ip, 
    server_port, 
    save, 
    title,
    set_api_ip_address,
    set_api_port_number,
  } = params;
  let history = useHistory();
  const on_server_ip_change = (event) => {
    set_api_ip_address(event.target.value);
  };
  const on_server_port_change = (event) => {
    set_api_port_number(event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }} >
        <Stack spacing={2}>
          <Title>{title}</Title>
          <TextField 
            required
            id="server_ip_address-basic" 
            label="Server IP" 
            variant="outlined" 
            value={server_ip}
            onChange={on_server_ip_change}
            inputProps={{
              'aria-label': 'server_ip',
            }}
          />
          <TextField 
            required
            id="server_port_address-basic" 
            label="Server Port" 
            variant="outlined" 
            value={server_port}
            onChange={on_server_port_change}
            inputProps={{
              'aria-label': 'server_port',
            }}
          />
          <Stack direction="row">
            <IconButton color="primary">
              <ArrowBackIcon fontSize="medium" onClick={
                ()=>{
                  history.goBack();
                }}
              />
            </IconButton>
            <IconButton color="primary">
              <SaveIcon fontSize="medium" onClick={
                ()=>{
                  save({
                    server_ip : server_ip,
                    server_port : server_port
                  });
                  history.goBack();
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}