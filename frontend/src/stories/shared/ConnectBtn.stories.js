import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ConnectBtn from '../../components/shared/ConnectBtn';

export default {
    component: ConnectBtn,
    title: 'shared/ConnectBtn',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    ws_connect: action('ws_connect'),
    ws_disconnect: action('ws_disconnect'),
};

export const main_data = {
    connect_title: "connect",
    disconnect_title: "disconnect"
};

storiesOf('shared/ConnectBtn', module)
    .add('Connect', () => {
        return (
            <div>
                <ConnectBtn
                    is_connect={true}
                    {...actions_data}
                    {...main_data}
                />
            </div>

        )
    })
    .add('Disconnect', () => {
        return (
            <div>
                <ConnectBtn
                    is_connect={false}
                    {...actions_data}
                    {...main_data}
                />
            </div>

        )
    })