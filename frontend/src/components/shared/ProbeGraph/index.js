import Chart from '../../shared/Chart';
import { get_chart_options } from './DataProvider';

export function ProbeGraph(deps) {
  const y_min = deps.graph_settings.y_min;
  const y_max = deps.graph_settings.y_max;
  const height = deps.graph_settings.height;
  const title = deps.title
  const get_chart_options_ = () => get_chart_options({
    snapshot: deps.probe_snapshot,
    height, title, y_min, y_max
  });
  const is_snapshot_loading =
    deps.is_playing_probe
      ? false
      : deps.is_probe_loading;
  const next_snapshot = () => deps.next_snapshot();
  const controls_disabled = deps.is_playing_probe

  return (
    <Chart
      is_snapshot_loading={is_snapshot_loading}
      snapshot={deps.probe_snapshot}
      next_snapshot={next_snapshot}
      hide={false}
      play_stream={deps.play_probe_stream}
      is_playing_stream={deps.is_playing_probe}
      pause_stream={deps.pause_probe_stream}
      open_setting={deps.open_graph_setting}
      controls_disabled={controls_disabled}
      selected_antenna={deps.selected_antenna}
      get_chart_options={get_chart_options_}
    />
  );
}