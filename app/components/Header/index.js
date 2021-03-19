/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Notification from 'components/Notification';
import { MenuItems } from './Constants';
import { StyledAppHeader, AvatarWrapper } from './StyledAppHeader';
const menu = (
  <Menu>
    {MenuItems.map((menuItem, index) => (
      <Menu.Item key={index} icon={menuItem.icon}>
        {menuItem.tabName}
      </Menu.Item>
    ))}
  </Menu>
);
const Header = () => (
  <StyledAppHeader>
    <AvatarWrapper>
      <Notification />
      <Dropdown.Button
        overlay={menu}
        placement="bottomCenter"
        icon={<UserOutlined />}
      />
    </AvatarWrapper>
  </StyledAppHeader>
);

export default Header;
