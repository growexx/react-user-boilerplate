/**
 *
 * InfiniteLoader.stories.js
 *
 */
import React from 'react';
import InfiniteLoader from '../index';

export default {
  title: 'Components/InfiniteLoader',
  component: InfiniteLoader,
};
const Template = args => <InfiniteLoader {...args} />;

export const InfiniteLoaderComponent = Template.bind({});
InfiniteLoaderComponent.args = {};

InfiniteLoaderComponent.storyName = 'InfiniteLoader';
