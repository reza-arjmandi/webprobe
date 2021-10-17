import {
    storiesOf
} from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DialogButtons from '../../components/probe/DialogButtons';

export default {
    component: DialogButtons,
    title: 'probe/DialogButtons',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    close: action('close'),
    is_open: true
};

storiesOf('probe/DialogButtons', module)
    .add('Default', () => {
        return (
            <DialogButtons
                {...actions_data}
            />
        )
    })
