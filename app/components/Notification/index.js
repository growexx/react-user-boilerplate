/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import {
  getFireStoreCollectionReference,
  getFireStoreDocumentReference,
} from 'utils/firebase';
import { FIRESTORE_COLLECTIONS, ROUTES } from 'containers/constants';
import { getUserData } from 'utils/Helper';
import { NotificationWrapper } from './StyledNotification';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: false,
    };
    this.unSubscribeToNewMessages = null;
  }

  /**
   * subscribeToNewMessages - real time updates for new message
   */
  subscribeToNewMessages = async () => {
    this.unSubscribeToNewMessages = getFireStoreCollectionReference(
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
          this.setState({
            newMessage: true,
          });
        },
        error => {
          // eslint-disable-next-line no-console
          console.log('Error getting documents: ', error);
        },
      );
  };

  async componentDidMount() {
    await this.subscribeToNewMessages();
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
      this.unSubscribeToNewMessages !== null &&
      typeof this.unSubscribeToNewMessages === 'function'
    ) {
      this.unSubscribeToNewMessages();
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

export default withRouter(Notification);
