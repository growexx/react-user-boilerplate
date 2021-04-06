/**
 *
 * Profile.stories.js
 *
 */
import React from 'react';
import Profile from '../index';

export default {
  title: 'Containers/Profile',
  component: Profile,
};
const Template = args => <Profile {...args} />;

export const ProfileComponent = Template.bind({});
ProfileComponent.args = {};

ProfileComponent.storyName = 'Profile';
