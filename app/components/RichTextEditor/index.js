/**
 *
 * RichTextEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { StyledEditor } from './StyledEditor';

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.setEditor = editor => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
  }

  render() {
    return (
      <StyledEditor>
        <Editor
          ref={this.setEditor}
          editorState={this.props.value}
          onChange={this.props.onChange}
        />
      </StyledEditor>
    );
  }
}

RichTextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default RichTextEditor;
