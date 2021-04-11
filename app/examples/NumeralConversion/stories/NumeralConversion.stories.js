/**
 *
 * NumeralConversion.stories.js
 *
 */
import React from 'react';
import NumeralConversion from '../index';

export default {
  title: 'Examples/NumeralConversion',
  component: NumeralConversion,
};
const Template = args => <NumeralConversion {...args} />;

export const NumeralConversionComponent = Template.bind({});
NumeralConversionComponent.args = {};

NumeralConversionComponent.storyName = 'NumeralConversion';
