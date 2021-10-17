import Chart from './Chart';
import { 
  get_1d_chart_options, 
  get_2d_chart_options 
} from './DataProvider'; 

export function ProbeGraph(deps) {
    const y_min = deps.settings.y_min;
    const y_max = deps.settings.y_max;
    const x_min = deps.settings.x_min;
    const x_max = deps.settings.x_max;
    const height = deps.settings.height;
    const title = deps.title;
    
    const get_chart_options_ = 
      deps.type === "probe_1d" 
      ? ()=> get_1d_chart_options({
        snapshot: deps.snapshot, height, title, y_min, y_max } )
      : ()=> get_2d_chart_options({
        snapshot: deps.snapshot, height, title, y_min, y_max, x_min, x_max } );

    return(
      <Chart 
        snapshot={deps.snapshot} 
        next_snapshot={deps.next_snapshot} 
        play_stream={deps.play_stream} 
        pause_stream={deps.pause_stream}
        open_setting={deps.open_setting}
        selected_antenna={deps.selected_antenna}
        get_chart_options={get_chart_options_}
        delete_graph={deps.delete}
        is_snapshot_loading={deps.is_snapshot_loading}
        controls_disabled={deps.controls_disabled}
        is_playing_stream={deps.is_streaming}
        hide={false}
      />
    );
  }