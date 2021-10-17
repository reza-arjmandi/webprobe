import {
    storiesOf
} from '@storybook/react';
import { action } from '@storybook/addon-actions';

import GraphSetting from '../../components/probe_settings/GraphSetting';

export default {
    component: GraphSetting,
    title: 'probe_settings/GraphSetting',
    excludeStories: /.*_data$/,
};

export const main_data = {
    title: "Graph1 settings",
    y_min: 0,
    y_max: 100,
    height: 300,
    play_speed: 100,
};

export const actions_data = {
    save: action('save'),
};

storiesOf('probe_settings/GraphSetting', module)
    .add('Default', () => {
        return (
            <GraphSetting
                {...main_data}
                {...actions_data}
            />
        )
    })
