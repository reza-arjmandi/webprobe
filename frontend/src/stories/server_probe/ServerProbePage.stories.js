import {
    storiesOf
} from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ServerProbePage from '../../components/probe';
import { DEFAUL_GRAPG_SETTING } from '../../constants/settings';

const theme = createTheme({});

export default {
    component: ServerProbePage,
    title: 'probe/ServerProbePage',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    open_adding_probe_page: action('open_adding_probe_page'),
};

export const main_data = {
    probes: [
        {
            id: "graph_1",
            title: "graph_1",
            graph_settings: DEFAUL_GRAPG_SETTING,
            probe_snapshot: [],
            is_playing_probe: false,
            is_probe_loading: false,
            settings_uri: "asds"
        },
        {
            id: "graph_2",
            title: "graph_2",
            graph_settings: DEFAUL_GRAPG_SETTING,
            probe_snapshot: [],
            is_playing_probe: false,
            is_probe_loading: false,
            settings_uri: "asds"
        },
        {
            id: "graph_3",
            title: "graph_3",
            graph_settings: DEFAUL_GRAPG_SETTING,
            probe_snapshot: [],
            is_playing_probe: false,
            is_probe_loading: false,
            settings_uri: "asds"
        },
    ],

};

storiesOf('probe/ServerProbePage', module)
    .add('Default', () => {
        return (
            <ThemeProvider theme={theme}>
                <ServerProbePage
                    {...actions_data}
                    {...main_data}
                />
            </ThemeProvider>
        )
    })
