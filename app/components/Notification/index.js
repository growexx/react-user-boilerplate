/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React from 'react';
import { BellOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge, Button } from 'antd';
import { getFireStoreCollectionReference } from 'utils/firebase';
import { FIRESTORE_COLLECTIONS, ROUTES } from 'containers/constants';
import { getUserData } from 'utils/Helper';
import { NotificationWrapper } from './StyledNotification';
import CartDrawer from '../CartDrawer';
const productCount = JSON.parse(localStorage.products || '[]').length;

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: false,
      visible: false,
      count: productCount,
    };
    this.unSubscribeToNewMessages = null;
  }

  /**
   * subscribeToNewMessages - real time updates for new message
   */
  subscribeToNewMessages = async () => {
    let loggedInUserId;
    await getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.PROFILE)
      .where(`email`, '==', getUserData().email)
      .get()
      .then(async querySnapshot => {
        const { docs } = querySnapshot;
        if (docs.length > 0) {
          loggedInUserId = docs[0].id;
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
      });

    this.unSubscribeToNewMessages = await getFireStoreCollectionReference(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
    )
      .where(`joined.${loggedInUserId}`, '==', true)
      .onSnapshot(
        async querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              const { chats } = doc.data();
              if (chats.length > 0) {
                const { from, seen } = chats[chats.length - 1];
                if (from.id !== loggedInUserId) {
                  if (!seen.includes(loggedInUserId)) {
                    const {
                      history: {
                        location: { pathname },
                      },
                    } = this.props;
                    if (pathname !== ROUTES.REAL_TIME_CHAT) {
                      this.setState({
                        newMessage: true,
                      });
                    }
                  }
                }
              }
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
    await this.subscribeToNewMessages();
    window.setCount = count => {
      this.setState({
        count,
      });
    };
    window.addEventListener('storage', () => {
      this.setState({
        count: JSON.parse(localStorage.getItem('products')).length || [],
      });
    });
  }

  setFlagToFalse = () => {
    this.setState({
      newMessage: false,
    });
  };

  onClickHandler = () => {
    this.setState({
      visible: true,
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
    const { newMessage, count, visible } = this.state;
    return (
      <NotificationWrapper>
        <div className="u-mr-1 u-d-inline-block">
          <Button
            onClick={this.onClickHandler}
            type="text"
            data-testid="badge-notification"
            className="btn-hover-none p-4"
          >
            <Badge count={count} size="small">
              <ShoppingCartOutlined className="u-font-size-lg" />
            </Badge>
          </Button>
        </div>
        <Badge dot={newMessage}>
          <BellOutlined />
        </Badge>
        <div data-testid="badge-cart-drawer" data-visible={visible}>
          <CartDrawer
            visible={visible}
            setVisible={e => {
              this.setState({
                visible: e,
              });
            }}
          />
        </div>
      </NotificationWrapper>
    );
  }
}

Notification.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Notification);
