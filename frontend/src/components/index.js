import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import MenuAppBar from './menu';
import GraphSettingPage from './probe_settings';
import ServerAddressPage from './api_settings';
import HomePage from './home';
import ServerProbePage from './probe';

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default function Dashboard(props) {
  const {
    menu_appbar_deps,
    menu_appbar_dispatch,
    probe_settings_page_deps,
    probe_settings_page_dispatch,
    server_address_deps,
    server_address_dispatch,
    server_probe_page_deps,
    server_probe_page_dispatch,
  } = props;

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuAppBar
          {...menu_appbar_deps}
          {...menu_appbar_dispatch}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Switch>
            <Route exact path="/graph_setting/:id">
              <GraphSettingPage
                {...probe_settings_page_deps}
                {...probe_settings_page_dispatch}
              />
            </Route>
            <Route exact path="/server_address">
              <ServerAddressPage
                title="Server Address"
                {...server_address_deps}
                {...server_address_dispatch}
              />
            </Route>
            <Route exact path="/probes">
              <ServerProbePage
                {...server_probe_page_deps}
                {...server_probe_page_dispatch}
              />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
