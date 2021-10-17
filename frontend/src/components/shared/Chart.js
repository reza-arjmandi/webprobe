import React from 'react';
import { withTheme } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import MediaControls from './MediaControls';
import CanvasJSReact from '../../assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends React.Component {

  render() {

    if (this.props.hide) {
      return (<div></div>);
    }

    const color_mode = this.props.theme.palette.mode === 'dark' 
      ? 'dark2' 
      : 'light1';
    const make_options = () => {
      return {
        ...this.props.get_chart_options(),
        'theme': color_mode
      }
    }
    return (
      <Paper
        sx={{ p: 1 }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <CanvasJSChart options={make_options()}
              onRef={ref => this.chart = ref}
            />
          </Grid>
          <Grid item xs={12}>
            <MediaControls
              is_loading={this.props.is_snapshot_loading}
              next_snapshot={() => this.props.next_snapshot()}
              play_stream={() => this.props.play_stream()}
              pause_stream={() => this.props.pause_stream()}
              open_setting={() => this.props.open_setting()}
              is_playing_stream={this.props.is_playing_stream}
              disabled={this.props.controls_disabled}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withTheme(Chart);
