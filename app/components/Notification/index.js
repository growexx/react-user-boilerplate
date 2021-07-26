/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React from 'react';
import { cloneDeep } from 'lodash';
import { Waypoint } from 'react-waypoint';
import { Badge, List, Skeleton } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { NOTIFICATIONS } from 'components/Notification/stub';
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
    });
    setTimeout(() => {
      const newNotificationList = notificationList.concat(NOTIFICATIONS);
      this.setState({
        notificationList: newNotificationList,
        newItemsLoading: false,
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
        />

        <Waypoint
          key={this.newNotificationsCursor}
          onEnter={this.handleMoreNotifications}
        >
          {this.getNewNotificationsLoader()}
        </Waypoint>
      </>
    );
  };

  setUnreadCount = visibility => {
    if (visibility) {
      this.setState({
        unreadCount: 0,
      });
    }
  };

  render() {
    const { unreadCount } = this.state;
    return (
      <NotificationWrapper>
        <Badge count={unreadCount} overflowCount={9}>
          <StyledPopOver
            placement="bottom"
            content={this.getNotificationContent}
            title="Notifications"
            overlayClassName="notificationPopoverContainer"
            autoAdjustOverflow
            onVisibleChange={this.setUnreadCount}
          >
            <BellOutlined />
          </StyledPopOver>
        </Badge>
      </NotificationWrapper>
    );
  }
}
export default Notification;
