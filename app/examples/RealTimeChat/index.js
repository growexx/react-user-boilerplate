/**
 *
 * RealTimeChat
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRealTimeChat from './selectors';
import reducer from './reducer';
import messages from './messages';

export function RealTimeChat() {
  useInjectReducer({ key: 'RealTimeChat', reducer });

  return (
    <div>
      <Helmet>
        <title>RealTimeChat</title>
        <meta name="description" content="Description of RealTimeChat" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

RealTimeChat.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  RealTimeChat: makeSelectRealTimeChat(),
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

export default compose(
  withConnect,
  memo,
)(RealTimeChat);
