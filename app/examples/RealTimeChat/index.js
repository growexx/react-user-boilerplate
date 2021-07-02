/**
 *
 * RealTimeChat
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';
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
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import reducer from 'examples/RealTimeChat/reducer';
import ChatRoom from 'examples/RealTimeChat/ChatRoom';
import ChatList from 'examples/RealTimeChat/ChatList';
import {
  ChatContainer,
  StyledRealTimeChat,
} from 'examples/RealTimeChat/StyledRealTimeChat';
import { REDUCER_KEY } from 'examples/RealTimeChat/constants';
import { updateField } from 'examples/RealTimeChat/actions';

export class RealTimeChat extends React.Component {
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

  componentDidMount() {
    const { updateAction } = this.props;

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
      });
  }

  render() {
    const {
      storeData: { searchResults, selectedChatWindow },
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>RealTimeChat</title>
          <meta name="description" content="Description of RealTimeChat" />
        </Helmet>
        <StyledRealTimeChat>
          <div className="searchContainer">
            <AutoComplete
              allowClear
              options={searchResults}
              onSelect={this.onSelect}
              placeholder="Search Users"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </div>
          <ChatContainer>
            <ChatList />
            {selectedChatWindow && selectedChatWindow.length > 0 && (
              <ChatRoom />
            )}
          </ChatContainer>
        </StyledRealTimeChat>
      </div>
    );
  }
}

RealTimeChat.propTypes = {
  storeData: PropTypes.object,
  updateAction: PropTypes.func,
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
