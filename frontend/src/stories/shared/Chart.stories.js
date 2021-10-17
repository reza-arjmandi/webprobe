import {
    storiesOf
} from '@storybook/react';

import Chart from '../../components/shared/Chart';
import { actions_data } from './MediaControls.stories';
import { shuffle } from '../Utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default {
    component: Chart,
    title: 'shared/Chart',
    excludeStories: /.*_data$/,
};

const theme = createTheme({});

export const main_data = {
    snapshot: shuffle([...Array(65536).keys()]),
    y_min: -80,
    y_max: 100,
    height: "300",
    get_chart_options: () => {
        return {
            data: [
                {
                    type: "scatter",
                    dataPoints: [
                        { x: -30, y: -50 },
                        { x: -28, y: -390 },
                        { x: -39, y: -400 },
                        { x: -34, y: 430 },
                        { x: -24, y: 321 },
                        { x: -29, y: 250 },
                        { x: -29, y: 370 },
                        { x: 23, y: -290 },
                        { x: 27, y: -250 },
                        { x: 34, y: -380 },
                        { x: 36, y: -320 },
                        { x: 33, y: 405 },
                        { x: 32, y: 453 },
                        { x: 21, y: 292 },
                        { x: 20, y: 70 }
                    ]
                }
            ],
        };
    }
};

storiesOf('shared/Chart', module)
    .add('Default', () => {
        return (
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        width: "480px",
                        height: "240px"
                    }}
                >
                    <Chart
                        {...main_data}
                        {...actions_data}
                        is_loading={false}
                        is_snapshot_loading={false}
                        title="Spectrum"
                    />
                </div>
            </ThemeProvider>
        )
    })
    .add('IsLoading', () => {
        return (
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        width: "480px",
                        height: "240px"
                    }}
                >
                    <Chart
                        {...main_data}
                        {...actions_data}
                        is_snapshot_loading={true}
                        title="Spectrum"
                    />
                </div>
            </ThemeProvider>
        )
    })
    .add('Hide', () => {
        return (
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        width: "480px",
                        height: "240px"
                    }}
                >
                    <Chart
                        {...main_data}
                        {...actions_data}
                        is_snapshot_loading={true}
                        hide={true}
                        title="Spectrum"
                    />
                </div>
            </ThemeProvider>
        )
    })
    .add('PlayingStream', () => {
        return (
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        width: "480px",
                        height: "240px"
                    }}
                >
                    <Chart
                        {...main_data}
                        {...actions_data}
                        is_playing_stream={true}
                        title="Spectrum"
                    />
                </div>
            </ThemeProvider>
        )
    })
    .add('ControlsDisabled', () => {
        return (
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        width: "480px",
                        height: "240px"
                    }}
                >
                    <Chart
                        {...main_data}
                        {...actions_data}
                        title="Spectrum"
                        controls_disabled={true}
                    />
                </div>
            </ThemeProvider>

        )
    })
    .add('AllAntennas', () => {
        return (
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        width: "480px",
                        height: "240px"
                    }}
                >
                    <Chart
                        {...main_data}
                        {...actions_data}
                        title="Spectrum"
                        controls_disabled={true}
                        selected_antenna="All"
                    />
                </div>
            </ThemeProvider>
        )
    })
