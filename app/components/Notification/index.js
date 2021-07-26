/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React from 'react';
import { cloneDeep } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Waypoint } from 'react-waypoint';
import { Badge, List, Skeleton } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { NOTIFICATIONS, TEST_IDS } from 'components/Notification/stub';
import {
  NotificationWrapper,
  StyledPopOver,
} from 'components/Notification/StyledNotification';
import { NOTIFICATION_LIMIT } from 'components/Notification/constants';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItemsLoading: false,
      unreadCount: NOTIFICATION_LIMIT,
      notificationList: cloneDeep(NOTIFICATIONS),
    };
    this.newNotificationsCursor = 0;
  }

  getNewNotificationsLoader = () => {
    const { newItemsLoading } = this.state;
    const loaderArray = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 2; index++) {
      loaderArray.push(
        <Skeleton
          avatar
          title={false}
          loading={newItemsLoading}
          active
          key={index}
        />,
      );
    }
    return <div className="newNotificationsLoader">{loaderArray}</div>;
  };

  handleMoreNotifications = () => {
    const { notificationList } = this.state;
    this.setState({
      newItemsLoading: true,
      unreadCount: 0,
    });
    setTimeout(() => {
      const newNotificationList = notificationList.concat(NOTIFICATIONS);
      this.setState({
        notificationList: newNotificationList,
        newItemsLoading: false,
        unreadCount: NOTIFICATION_LIMIT,
      });
      this.newNotificationsCursor = this.newNotificationsCursor + 1;
    }, 5000);
  };

  getNotificationContent = () => {
    const { notificationList } = this.state;
    return (
      <>
        <List
          dataSource={notificationList}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <span className="notificationIcon">{item.icon}</span>
              <p className="notificationContent">{item.update}</p>
            </List.Item>
          )}
        >
          <Waypoint
            key={this.newNotificationsCursor}
            onEnter={this.handleMoreNotifications}
          >
            {this.getNewNotificationsLoader()}
          </Waypoint>
        </List>
      </>
    );
  };

  setMarkAllRead = () => {
    this.setState({
      unreadCount: 0,
    });
  };

  getTitle = () => {
    const { unreadCount } = this.state;
    return (
      <>
        <p>Notifications</p>
        {unreadCount > 0 && <p>{unreadCount}</p>}
        <FontAwesomeIcon
          icon={faCheck}
          onClick={this.setMarkAllRead}
          data-testid={TEST_IDS.MARK_ALL_READ}
        />
      </>
    );
  };

  render() {
    const { unreadCount } = this.state;
    return (
      <NotificationWrapper>
        <Badge count={unreadCount} overflowCount={9}>
          <StyledPopOver
            placement="bottomLeft"
            content={this.getNotificationContent}
            title={this.getTitle}
            overlayClassName="notificationPopoverContainer"
            onVisibleChange={this.setUnreadCount}
            trigger="click"
          >
            <BellOutlined />
          </StyledPopOver>
        </Badge>
      </NotificationWrapper>
    );
  }
}
export default Notification;
