import DataAccess from './DataAccess';
import ApiSettingsDataAccess from './ApiSettingsDataAccess';

export const GraphSettings = new DataAccess(
    { key: 'graph_settings', default_value: '{}' });

export const ServerProbes = new DataAccess(
    { key: 'server_probes', default_value: '{}' });

export const ApiSettings = new ApiSettingsDataAccess();
