import {
    storiesOf
} from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddProbeDialog from '../../components/probe/AddProbeDialog';

export default {
    component: AddProbeDialog,
    title: 'probe/AddProbeDialog',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    close: action('close'),
    add_probe: action('add_probe'),
    is_open: true
};

storiesOf('probe/AddProbeDialog', module)
    .add('Default', () => {
        return (
            <AddProbeDialog
                {...actions_data}
            />
        )
    })
