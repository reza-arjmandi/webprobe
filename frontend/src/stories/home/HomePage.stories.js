import { storiesOf } from '@storybook/react';

import HomePage from '../../components/home';

export default {
   component: HomePage,
   title: 'home/HomePage',
   excludeStories: /.*_data$/,
};

storiesOf('home/HomePage', module)
   .add('Default', () => {
      return <HomePage />
   })