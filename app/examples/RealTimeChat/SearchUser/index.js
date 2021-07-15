/**
 *
 * SearchUser
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { getUserData } from 'utils/Helper';
import { getFireStoreCollectionReference } from 'utils/firebase';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import { loadApp } from 'containers/App/actions';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import reducer from 'examples/RealTimeChat/reducer';
import { REDUCER_KEY } from 'examples/RealTimeChat/constants';
import { updateField } from 'examples/RealTimeChat/actions';
import { resetChatWindow } from 'examples/RealTimeChat/helper';
import { isEqual } from 'lodash';

export class SearchUser extends React.Component {
  onSelect = async value => {
    const {
      updateAction,
      storeData: { currentUserRef, selectedChatWindow },
    } = this.props;

    const isChatWindowOpen =
      selectedChatWindow && Object.keys(selectedChatWindow).length > 0;
    await getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.PROFILE)
      .where(`email`, '==', value)
      .get()
      .then(async querySnapshot => {
        const { docs } = querySnapshot;
        if (docs.length > 0) {
          const newWindowParticipants = {
            [currentUserRef.id]: true,
            [docs[0].id]: true,
          };
          if (
            !isChatWindowOpen ||
            !isEqual(selectedChatWindow, newWindowParticipants)
          ) {
            resetChatWindow(updateAction);
            updateAction('selectedChatWindow', newWindowParticipants);
            if (isChatWindowOpen) {
              updateAction('forceChatWindow', true);
            }
          }
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
      });
  };

  async componentDidMount() {
    const { updateAction, onChangeAppLoading } = this.props;
    onChangeAppLoading(true);
    // get users for search
    await getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.PROFILE)
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
    onChangeAppLoading(false);
  }

  render() {
    const {
      storeData: { searchResults },
    } = this.props;
    return (
      <div className="searchContainer">
        <AutoComplete
          allowClear
          options={searchResults}
          onSelect={this.onSelect}
          placeholder="Search Users"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    );
  }
}

SearchUser.propTypes = {
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
)(SearchUser);
