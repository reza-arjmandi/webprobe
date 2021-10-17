import { get_ops_for_one_antenna } from '../GraphDataProvider/OneAntennaDataProvider';

export function get_chart_options({ snapshot, height, title, y_min, y_max }) {
    var ops;
    ops = get_ops_for_one_antenna(
        { snapshot, height, title, y_min, y_max });
    return ops;
}