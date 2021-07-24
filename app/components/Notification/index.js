/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React from 'react';
import { Badge, Dropdown, Menu } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { NOTIFICATIONS } from 'components/Notification/stub';
import { NotificationWrapper } from './StyledNotification';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadCount: 0,
    };
  }

  getMenu = MenuItems => (
    <Menu>
      {MenuItems.map(menuItem => (
        <Menu.Item key={`${menuItem}`} icon={menuItem.icon}>
          {menuItem.update}
        </Menu.Item>
      ))}
    </Menu>
  );

  render() {
    const { unreadCount } = this.state;
    return (
      <NotificationWrapper>
        <Badge count={unreadCount}>
          <Dropdown.Button
            overlay={this.getMenu(NOTIFICATIONS)}
            icon={<BellOutlined />}
            trigger={['click']}
            placement="bottomLeft"
          />
        </Badge>
      </NotificationWrapper>
    );
  }
}
export default Notification;
