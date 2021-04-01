/**
 *
 * Loader.stories.js
 *
 */
import React from 'react';
import Loader from '../index';

export default {
  title: 'Components/Loader',
  component: Loader,
};
const Template = args => <Loader {...args} />;

export const InfiniteLoaderComponent = Template.bind({});
InfiniteLoaderComponent.args = {};

InfiniteLoaderComponent.storyName = 'Loader';
