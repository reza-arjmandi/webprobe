import { storiesOf } from '@storybook/react';

import Dashboard from '../../components';
import { actions_data } from '../shared/ConnectBtn.stories'
import { page_data as diagnose_page_data } from '../debug_detector/DebugDetectorDDCModePage.stories';

export default {
    component: Dashboard,
    title: 'home/Dashboard',
    excludeStories: /.*_data$/,
};

storiesOf('home/Dashboard', module)
    .add('Default', () => {
        return (
            <div>
                <Dashboard
                    diagnose_page_deps={diagnose_page_data}
                    {...actions_data}
                />
            </div>
        )
    })
