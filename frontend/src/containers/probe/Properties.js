
export const get_properties = state => ({
    is_adding_probe_dialog_open: state.IsAddingProbeDialogOpen,
    probes: state.ServerProbes,
    probe_snapshots: state.ProbeSnapshots,
    graph_settings: state.GraphSettings,
    is_loading: state.IsLoading,
    probe_on_stream: state.PlayProbeStream,
});