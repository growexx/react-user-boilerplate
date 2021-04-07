/**
 *
 * RichTextEditor
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Editor, EditorState } from 'draft-js';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { StyledEditor } from './StyledEditor';

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
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
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </StyledEditor>
    );
  }
}

RichTextEditor.propTypes = {};

export default RichTextEditor;
