/**
 *
 * Login.stories.js
 *
 */
import React from 'react';
import Login from '../index';

export default {
  title: 'Containers/Login',
  component: Login,
};
const Template = args => <Login {...args} />;

export const LoginComponent = Template.bind({});
LoginComponent.args = {};

LoginComponent.storyName = 'Login';
