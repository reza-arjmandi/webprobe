import {
    storiesOf
} from '@storybook/react';
import { actions_data } from './MediaControls.stories';
import DataTable from '../../components/shared/DataTable';

export default {
    component: DataTable,
    title: 'shared/DataTable',
    excludeStories: /.*_data$/,
};

export const main_data = {
    title: "Table Title",
    table_head: [
        "read_data_stage_time",
        "shift_data_stage_time",
        "take_pdft_stage_time",
        "rotate_buffer_stage_time",
        "fft_pipeline_time",
    ],
    table_rows: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    media_deps: actions_data
};

storiesOf('shared/DataTable', module)
    .add('Default', () => {
        return (
            <DataTable
                {...main_data}
            />
        )
    })
