/**
 *
 * ChangePassword
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
import makeSelectChangePassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ChangePassword() {
  useInjectReducer({ key: 'changePassword', reducer });
  useInjectSaga({ key: 'changePassword', saga });

  return (
    <div>
      <Helmet>
        <title>ChangePassword</title>
        <meta name="description" content="Description of ChangePassword" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  changePassword: makeSelectChangePassword(),
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

export default compose(withConnect)(ChangePassword);
