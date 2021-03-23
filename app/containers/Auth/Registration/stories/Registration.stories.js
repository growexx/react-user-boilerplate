/**
 *
 * Registration.stories.js
 *
 */
import React from 'react';
import Registration from '../index';

export default {
  title: 'Containers/Registration',
  component: Registration,
};
const Template = args => <Registration {...args} />;

export const RegistrationComponent = Template.bind({});
RegistrationComponent.args = {};

RegistrationComponent.storyName = 'Registration';
