import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';

import VirtualCardConfig from '../../components/shared/VirtualCardConfig'

export default {
    component: VirtualCardConfig,
    title: 'shared/VirtualCardConfig',
    excludeStories: /.*_data$/,
}

export const actions_data = {
    set_antenna: action('set_antenna'),
    set_mode: action('set_mode'),
    start: action('start'),
    sync: action('sync'),
};

storiesOf('shared/VirtualCardConfig', module)
    .add('Default', () => {
        return (
            <div>
                <VirtualCardConfig
                    {...actions_data}
                />
            </div>
        )
    }
    )