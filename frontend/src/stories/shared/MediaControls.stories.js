import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MediaControls from '../../components/shared/MediaControls';

export default {
    component: MediaControls,
    title: 'shared/MediaControls',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    next_snapshot: action('next_snapshot'),
    play_stream: action('play_stream'),
    pause_stream: action('pause_stream'),
    open_setting: action('open_setting'),
};

storiesOf('shared/MediaControls', module)
    .add('Default', () => {
        return (
            <div>
                <MediaControls
                    {...actions_data}
                    is_loading={false}
                />
            </div>
        )
    })
    .add('IsLoading', () => {
        return (
            <div>
                <MediaControls
                    {...actions_data}
                    is_loading={true}
                />
            </div>
        )
    })
    .add('PlayingStream', () => {
        return (
            <div>
                <MediaControls
                    {...actions_data}
                    is_playing_stream={true}
                />
            </div>
        )
    })
    .add('Disabled', () => {
        return (
            <div>
                <MediaControls
                    {...actions_data}
                    disabled={true}
                />
            </div>
        )
    })
