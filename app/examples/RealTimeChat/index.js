/**
 *
 * RealTimeChat
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AutoComplete, Result } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { getUserData } from 'utils/Helper';
import {
  getFireStoreCollectionReference,
  getFireStoreDocumentReference,
} from 'utils/firebase';
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
import { REDUCER_KEY, NO_CHATS_OPEN } from 'examples/RealTimeChat/constants';
import { updateField } from 'examples/RealTimeChat/actions';

export class RealTimeChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstTimeRendered: false,
    };
  }

  onSelect = value => {
    const {
      updateAction,
      storeData: { currentUserRef },
    } = this.props;

    const selectedUserDocReference = getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      value,
    );
    updateAction('selectedChatWindow', [
      currentUserRef,
      selectedUserDocReference,
    ]);
  };

  setCurrentUserRef = async () => {
    const { updateAction } = this.props;

    const currentUserRef = await getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      getUserData().email,
    );
    updateAction('currentUserRef', currentUserRef);
  };

  async componentDidMount() {
    const { updateAction, onChangeAppLoading } = this.props;
    onChangeAppLoading(true);
    // get users for search
    getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.PROFILE)
      .where('email', '!=', getUserData().email)
      .get()
      .then(querySnapshot => {
        const result = [];
        querySnapshot.forEach(doc => {
          result.push({ value: doc.data().email });
        });
        updateAction('searchResults', result);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
        onChangeAppLoading(false);
      });
    await this.setCurrentUserRef();
    onChangeAppLoading(false);
    this.setState({
      isFirstTimeRendered: true,
    });
  }

  render() {
    const { isFirstTimeRendered } = this.state;
    const {
      storeData: { searchResults, selectedChatWindow },
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>RealTimeChat</title>
          <meta name="description" content="Description of RealTimeChat" />
        </Helmet>
        {isFirstTimeRendered && (
          <StyledRealTimeChat>
            <div className="searchContainer">
              <AutoComplete
                allowClear
                options={searchResults}
                onSelect={this.onSelect}
                placeholder="Search Users"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </div>
            <ChatContainer>
              <ChatList />
              {selectedChatWindow && selectedChatWindow.length > 0 ? (
                <ChatRoom />
              ) : (
                <div className="noChats">
                  <Result icon={<WechatOutlined />} title={NO_CHATS_OPEN} />
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
