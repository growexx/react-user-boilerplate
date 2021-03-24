/**
 *
 * AuthContainer.stories.js
 *
 */
import React from 'react';
import { AUTH_TYPE } from '../constants';
import AuthContainer from '../index';

export default {
  title: 'Containers/AuthContainer',
  component: AuthContainer,
};
const Template = args => <AuthContainer {...args} />;

export const AuthContainerComponent = Template.bind({});
AuthContainerComponent.args = {
  authType: AUTH_TYPE[1],
};

AuthContainerComponent.storyName = 'AuthContainer';
