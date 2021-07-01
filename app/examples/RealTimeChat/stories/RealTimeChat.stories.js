/**
 *
 * RealTimeChat.stories.js
 *
 */
import React from 'react';
import RealTimeChat from '../index';

export default {
  title: 'Containers/RealTimeChat',
  component: RealTimeChat,
};
const Template = args => <RealTimeChat {...args} />;

export const RealTimeChatComponent = Template.bind({});
RealTimeChatComponent.args = {};

RealTimeChatComponent.storyName = 'RealTimeChat';
