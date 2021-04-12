/**
 *
 * RichTextEditor.stories.js
 *
 */
import React from 'react';
import RichTextEditor from '../index';

export default {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
};
const Template = args => <RichTextEditor {...args} />;

export const RichTextEditorComponent = Template.bind({});
RichTextEditorComponent.args = {};

RichTextEditorComponent.storyName = 'RichTextEditor';
