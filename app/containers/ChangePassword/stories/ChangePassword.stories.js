/**
 *
 * ChangePassword.stories.js
 *
 */
import React from 'react';
import ChangePassword from '../index';

export default {
  title: 'Containers/ChangePassword',
  component: ChangePassword,
};
const Template = args => <ChangePassword {...args} />;

export const ChangePasswordComponent = Template.bind({});
ChangePasswordComponent.args = {};

ChangePasswordComponent.storyName = 'ChangePassword';
