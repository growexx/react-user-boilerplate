/**
 *
 * ReactFinalForm
 *
 */

import React, { memo } from 'react';
// import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import messages from './messages';

export function ReactFinalForm() {
  return (
    <div>
      <Helmet>
        <title>ReactFinalForm</title>
        <meta name="description" content="Description of ReactFinalForm" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ReactFinalForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ReactFinalForm);
