import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SettingControls from '../../components/shared/SettingControls';

export default {
    component: SettingControls,
    title: 'shared/SettingControls',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    save: action('save'),
    sync: action('sync'),
};

storiesOf('shared/SettingControls', module)
    .add('Default', () => <SettingControls {...actions_data} />)
