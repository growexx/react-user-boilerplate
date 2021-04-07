/**
 *
 * RichTextEditor
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function RichTextEditor() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

RichTextEditor.propTypes = {};

export default RichTextEditor;
