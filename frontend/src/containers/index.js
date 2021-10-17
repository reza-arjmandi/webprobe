import { connect } from 'react-redux';

import Dashboard from '../components'
import { get_properties as get_menu_appbar_deps } from './menu_appbar/Properties';
import { get_actions as get_menu_appbar_dispatch } from './menu_appbar/Actions';
import { get_properties as get_server_address_page_deps } from './api_settings/Properties';
import { get_actions as get_server_address_page_dispatch } from './api_settings/Actions';
import { get_actions as get_server_probe_page_dispatch } from './probe/Actions';
import { get_properties as get_server_probe_page_deps } from './probe/Properties';

import { get_properties as get_probe_settings_page_deps } from './probe_settings/Properties';
import { get_actions as get_probe_settings_page_dispatch } from './probe_settings/Actions';

const map_state_to_props = state => ({
    menu_appbar_deps: get_menu_appbar_deps(state),
    server_address_deps: get_server_address_page_deps(state),
    server_probe_page_deps: get_server_probe_page_deps(state),
    probe_settings_page_deps: get_probe_settings_page_deps(state),
});

const map_dispatch_to_props = dispatch => ({
    menu_appbar_dispatch: get_menu_appbar_dispatch(dispatch),
    server_address_dispatch: get_server_address_page_dispatch(dispatch),
    server_probe_page_dispatch: get_server_probe_page_dispatch(dispatch),
    probe_settings_page_dispatch: get_probe_settings_page_dispatch(dispatch),
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Dashboard);