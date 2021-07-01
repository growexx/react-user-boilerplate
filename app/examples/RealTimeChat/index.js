/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
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
import ChatRoom from './ChatRoom';
import ChatList from './ChatList';
import { StyledRealTimeChat } from './StyledRealTimeChat';
import { REDUCER_KEY } from './constants';

export function RealTimeChat() {
  useInjectReducer({ key: REDUCER_KEY, reducer });

  return (
    <div>
      <Helmet>
        <title>RealTimeChat</title>
        <meta name="description" content="Description of RealTimeChat" />
      </Helmet>
      <StyledRealTimeChat>
        <ChatList />
        <ChatRoom />
      </StyledRealTimeChat>
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
