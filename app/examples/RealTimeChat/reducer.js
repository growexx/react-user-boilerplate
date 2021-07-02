/*
 *
 * RealTimeChat reducer
 *
 */
import produce from 'immer';
import { getFireStoreDocumentReference } from 'utils/firebase';
import { getUserData } from 'utils/Helper';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import { UPDATE_FIELD } from './constants';

export const initialState = {
  currentUserRef: getFireStoreDocumentReference(
    FIRESTORE_COLLECTIONS.PROFILE,
    getUserData().email,
  ),
  receiverUserRefs: [],
  receiverUserValues: [],
  currentUserValue: {},
  searchResults: [],
  loading: false,
  selectedChatWindow: '',
};

/* eslint-disable default-case, no-param-reassign */
const RealTimeChatReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_FIELD:
        draft[action.key] = action.payload;
        break;
    }
  });

export default RealTimeChatReducer;
