export const get_properties = state => ({
    is_connect: state.IsConnect,
    backend_ip: state.ServerIPAddress,
    backend_port: state.ServerPortNumber,
    debug_detector_mode: state.DD_VitrCrdMode,
});