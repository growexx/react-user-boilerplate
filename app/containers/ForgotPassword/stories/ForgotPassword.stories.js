/**
 *
 * ForgotPassword.stories.js
 *
 */
import React from 'react';
import ForgotPassword from '../index';

export default {
  title: 'Containers/ForgotPassword',
  component: ForgotPassword,
};
const Template = args => <ForgotPassword {...args} />;

export const ForgotPasswordComponent = Template.bind({});
ForgotPasswordComponent.args = {};

ForgotPasswordComponent.storyName = 'ForgotPassword';
