/**
 *
 * RealTimeChat
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Result } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { getUserData } from 'utils/Helper';
import { getFireStoreDocumentReference } from 'utils/firebase';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import { loadApp } from 'containers/App/actions';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import reducer from 'examples/RealTimeChat/reducer';
import ChatRoom from 'examples/RealTimeChat/ChatRoom';
import ChatList from 'examples/RealTimeChat/ChatList';
import {
  ChatContainer,
  StyledRealTimeChat,
} from 'examples/RealTimeChat/StyledRealTimeChat';
import {
  REDUCER_KEY,
  NO_CHATS_OPEN,
  SEARCH_USER,
} from 'examples/RealTimeChat/constants';
import { updateField } from 'examples/RealTimeChat/actions';
import SearchUser from 'examples/RealTimeChat/SearchUser';

export class RealTimeChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstTimeRendered: false,
      error: false,
    };
  }

  setCurrentUserRef = async () => {
    const { updateAction } = this.props;

    const currentUserRef = await getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      getUserData().email,
    );
    updateAction('currentUserRef', currentUserRef);
  };

  async componentDidMount() {
    const { onChangeAppLoading } = this.props;
    onChangeAppLoading(true);
    // get users for search
    await this.setCurrentUserRef();
    onChangeAppLoading(false);
    this.setState({
      isFirstTimeRendered: true,
    });
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { isFirstTimeRendered, error } = this.state;
    const {
      storeData: { selectedChatWindow, chatList },
    } = this.props;
    const isChatWindowOpen =
      selectedChatWindow && selectedChatWindow.length > 0;
    if (error) {
      return (
        <Result
          type="error"
          title="Some Error Occurred"
          subTitle="Please try refreshing the page or wait for some time"
        />
      );
    }

    return (
      <div>
        <Helmet>
          <title>RealTimeChat</title>
          <meta name="description" content="Description of RealTimeChat" />
        </Helmet>
        {isFirstTimeRendered && (
          <StyledRealTimeChat>
            {chatList.length === 0 && <SearchUser />}
            <ChatContainer>
              <ChatList />
              {isChatWindowOpen ? (
                <ChatRoom />
              ) : (
                <div
                  className={`noChats ${
                    chatList.length > 0 ? 'displayNone' : ''
                  }`}
                >
                  <Result
                    icon={<WechatOutlined />}
                    title={chatList.length > 0 ? NO_CHATS_OPEN : SEARCH_USER}
                  />
                </div>
              )}
            </ChatContainer>
          </StyledRealTimeChat>
        )}
      </div>
    );
  }
}

RealTimeChat.propTypes = {
  storeData: PropTypes.object,
  updateAction: PropTypes.func,
  onChangeAppLoading: PropTypes.func,
};

const withReducer = injectReducer({ key: REDUCER_KEY, reducer });

const mapStateToProps = createStructuredSelector({
  storeData: makeSelectRealTimeChat(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateAction: (fieldName, fieldValue) => {
      dispatch(updateField(fieldName, fieldValue));
    },
    onChangeAppLoading: loading => dispatch(loadApp(loading)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  memo,
)(RealTimeChat);
