/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { Badge, Button, List, Skeleton, Empty, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BellOutlined } from '@ant-design/icons';
import { TEST_IDS } from 'components/Notification/stub';
import {
  NotificationWrapper,
  StyledPopOver,
} from 'components/Notification/StyledNotification';
import {
  onMessageListener,
  requestFirebaseNotificationPermission,
} from 'utils/firebase';
import {
  NOTIFICATION_LIMIT,
  getNotificationsMock,
} from 'components/Notification/constants';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItemsLoading: false,
      unreadCount: 0,
      notificationList: [],
      loading: false,
      hasMore: true,
    };
    this.newNotificationsCursor = 0;
  }

  loadNotifications = (notificationType, payload) => {
    const { notificationList, unreadCount } = this.state;
    if (notificationType === 'pushNotification') {
      const {
        notification: { body, icon, click_action: clickAction },
      } = payload;
      const notificationObject = {
        update: body,
        read: false,
        clickAction,
        icon,
      };
      this.setState({
        notificationList: [notificationObject, ...notificationList],
        unreadCount: unreadCount + 1,
      });
    } else {
      setTimeout(() => {
        getNotificationsMock()
          .then(res => {
            if (res.status) {
              if (res.data.length !== NOTIFICATION_LIMIT) {
                this.setState({
                  hasMore: false,
                });
              }
              this.setState({
                notificationList: [...notificationList, ...res.data],
                loading: false,
                unreadCount: unreadCount + res.data.length,
                newItemsLoading: false,
              });
            } else {
              this.setState({
                notificationList,
                unreadCount,
                loading: false,
                newItemsLoading: false,
              });
            }
          })
          .catch(err => {
            notification.error({ message: err.message });
            this.setState({
              notificationList,
              unreadCount,
              loading: false,
              newItemsLoading: false,
            });
          });
      }, 2000);
    }
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.loadNotifications();
    requestFirebaseNotificationPermission()
      .then(token => {
        if (token) {
          notification.info({
            message: 'Firebase',
            description: 'Token retrieved..!',
          });
        }
      })
      .catch(err => {
        notification.error({
          message: 'Error',
          description: JSON.stringify(err),
        });
      });

    onMessageListener()
      .then(payload => {
        const { title, body } = payload.notification;
        this.loadNotifications('pushNotification', payload);
        notification.success({ message: title, description: body });
      })
      .catch(err => {
        notification.error({
          message: 'Error',
          description: JSON.stringify(err),
        });
      });
  }

  handleReadCount = () => {
    const { notificationList } = this.state;
    const unreadCount = notificationList.filter(
      singleNotification => singleNotification.read === false,
    ).length;
    this.setState({
      unreadCount,
    });
  };

  handleNotificationClick = (item, index) => {
    const { notificationList } = this.state;
    const { clickAction, read } = item;
    if (read === false) {
      const newItem = {
        ...item,
        read: true,
      };
      const currentItems = [...notificationList];
      currentItems[index] = newItem;
      this.setState(
        {
          notificationList: currentItems,
        },
        () => {
          this.handleReadCount();
        },
      );
    }
    if (clickAction) {
      const pathname = clickAction.split('/').pop();
      this.props.history.push(pathname);
    }
  };

  getNewNotificationsLoader = loaderCount => {
    const { loading, newItemsLoading } = this.state;
    const loaderArray = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < loaderCount; index++) {
      loaderArray.push(
        <Skeleton
          avatar
          title={false}
          loading={newItemsLoading || loading}
          active
          key={index}
        />,
      );
    }
    return <div className="newNotificationsLoader">{loaderArray}</div>;
  };

  markAllNotificationsAsRead = () => {
    const { notificationList } = this.state;
    const updatedNotificationList = notificationList.map(
      updatedNotification => ({
        ...updatedNotification,
        read: true,
      }),
    );
    this.setState({
      notificationList: updatedNotificationList,
    });
  };

  handleMoreNotifications = () => {
    this.setState({
      newItemsLoading: true,
    });
    this.loadNotifications();
  };

  getIcon = icon => {
    if (typeof icon === 'object') {
      return icon;
    }
    return <img src={icon} alt="icon" />;
  };

  getNotificationContent = () => {
    const { notificationList, loading, hasMore } = this.state;
    const notificationsLength = notificationList.length;
    if (loading) {
      return this.getNewNotificationsLoader(10);
    }
    return (
      <>
        <List>
          {notificationsLength === 0 ? (
            <Empty data-testid={TEST_IDS.EMPTY_CONTAINER} />
          ) : (
            notificationList.map((item, index) => (
              <List.Item
                // eslint-disable-next-line react/no-array-index-key
                key={`${index}_${item}`}
                className={item.read === false ? 'readNotifications' : ''}
                onClick={() => this.handleNotificationClick(item, index)}
                data-testid={TEST_IDS.NOTIFICATION_ITEM}
              >
                <span className="notificationIcon">
                  {this.getIcon(item.icon)}
                </span>
                <p className="notificationContent">{item.update}</p>
              </List.Item>
            ))
          )}
          {!loading && hasMore && (
            <Waypoint
              data-testid={TEST_IDS.INFINITE_SCROLLING}
              key={this.newNotificationsCursor}
              onEnter={this.handleMoreNotifications}
            >
              {this.getNewNotificationsLoader(2)}
            </Waypoint>
          )}
        </List>
      </>
    );
  };

  setMarkAllRead = () => {
    this.markAllNotificationsAsRead();
    this.setState({
      unreadCount: 0,
    });
  };

  getTitle = () => {
    const { unreadCount } = this.state;
    return (
      <>
        <p>Notifications</p>
        {unreadCount > 0 && (
          <>
            <FontAwesomeIcon
              icon={faCheck}
              title={TEST_IDS.MARK_ALL_READ}
              onClick={this.setMarkAllRead}
              data-testid={TEST_IDS.MARK_ALL_READ}
            />
          </>
        )}
      </>
    );
  };

  render() {
    const { unreadCount } = this.state;
    return (
      <NotificationWrapper>
        <div className="u-mr-1 u-d-inline-block">
          <Button
            type="text"
            data-testid="badge-Cart"
            className="btn-hover-none p-4"
          >
            <StyledPopOver
              placement="bottomLeft"
              content={this.getNotificationContent()}
              title={this.getTitle}
              overlayClassName="notificationPopoverContainer"
              trigger="click"
            >
              <Badge count={unreadCount} overflowCount={9} size="small">
                <BellOutlined
                  data-testid={TEST_IDS.BELL_ICON}
                  className="u-font-size-xlg"
                />
              </Badge>
            </StyledPopOver>
          </Button>
        </div>
      </NotificationWrapper>
    );
  }
}
export default withRouter(Notification);

Notification.propTypes = {
  history: PropTypes.object,
};
