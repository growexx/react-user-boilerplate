/**
 *
 * ForgotPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectForgotPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ForgotPassword() {
  useInjectReducer({ key: 'forgotPassword', reducer });
  useInjectSaga({ key: 'forgotPassword', saga });

  return (
    <div>
      <Helmet>
        <title>ForgotPassword</title>
        <meta name="description" content="Description of ForgotPassword" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forgotPassword: makeSelectForgotPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ForgotPassword);
