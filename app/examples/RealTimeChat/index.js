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
import { Input, AutoComplete } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { getUserData } from 'utils/Helper';
import makeSelectRealTimeChat from './selectors';
import reducer from './reducer';
import messages from './messages';
import ChatRoom from './ChatRoom';
import ChatList from './ChatList';
import { ChatContainer, StyledRealTimeChat } from './StyledRealTimeChat';
import { REDUCER_KEY } from './constants';
import { updateField } from './actions';
import {
  getFireStoreCollectionReference,
  getFireStoreDocumentReference,
} from '../../utils/firebase';
import { FIRESTORE_COLLECTIONS } from '../../containers/constants';
export class RealTimeChat extends React.Component {
  onSelect = value => {
    const { updateAction } = this.props;
    const currentUserDocReference = getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      getUserData().email,
    );
    const selectedUserDocReference = getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      value,
    );
    updateAction('selectedChatWindow', [
      currentUserDocReference,
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
