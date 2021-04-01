/**
 *
 * ExportDataToCsv.stories.js
 *
 */
import React from 'react';
import ExportDataToCsv from '../index';

export default {
  title: 'Components/ExportDataToCsv',
  component: ExportDataToCsv,
};
const Template = args => <ExportDataToCsv {...args} />;

export const ExportDataToCsvComponent = Template.bind({});
ExportDataToCsvComponent.args = {};

ExportDataToCsvComponent.storyName = 'ExportDataToCsv';
