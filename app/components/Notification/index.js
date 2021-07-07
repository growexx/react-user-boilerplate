/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import {
  getFireStoreCollectionReference,
  getFireStoreDocumentReference,
} from 'utils/firebase';
import { FIRESTORE_COLLECTIONS, ROUTES } from 'containers/constants';
import { loadApp } from 'containers/App/actions';
import { getUserData } from 'utils/Helper';
import { updateField } from 'examples/RealTimeChat/actions';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import { NotificationWrapper } from './StyledNotification';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: false,
    };
    this.unSubscribeToChatList = null;
  }

  /**
   * subscribeToChatList - real time updates for chat list
   */
  subscribeToChatList = async () => {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;
    this.unSubscribeToChatList = getFireStoreCollectionReference(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
    )
      .where(
        'joined',
        'array-contains',
        getFireStoreDocumentReference(
          FIRESTORE_COLLECTIONS.PROFILE,
          getUserData().email,
        ),
      )
      .onSnapshot(
        async () => {
          if (pathname !== ROUTES.REAL_TIME_CHAT) {
            this.setState({
              newMessage: true,
            });
          }
        },
        error => {
          // eslint-disable-next-line no-console
          console.log('Error getting documents: ', error);
        },
      );
  };

  async componentDidMount() {
    await this.subscribeToChatList();
  }

  setFlagToFalse = () => {
    this.setState({
      newMessage: false,
    });
  };

  componentDidUpdate() {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;
    const { newMessage } = this.state;
    if (pathname === ROUTES.REAL_TIME_CHAT) {
      if (newMessage) {
        this.setFlagToFalse();
      }
    }
  }

  componentWillUnmount() {
    if (
      this.unSubscribeToChatList !== null &&
      this.unSubscribeToChatList instanceof Function
    ) {
      this.unSubscribeToChatList();
    }
  }

  render() {
    const { newMessage } = this.state;
    return (
      <NotificationWrapper>
        <Badge dot={newMessage}>
          <BellOutlined />
        </Badge>
      </NotificationWrapper>
    );
  }
}

Notification.propTypes = {
  history: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeAppLoading: loading => dispatch(loadApp(loading)),
    updateAction: (fieldName, fieldValue) => {
      dispatch(updateField(fieldName, fieldValue));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  storeData: makeSelectRealTimeChat(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withRouter(Notification));
