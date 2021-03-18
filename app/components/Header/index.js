/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MenuItems } from './Constants';
import { StyledAppHeader, AvatarWrapper } from './StyledAppHeader';
class Header extends React.Component {
  render() {
    const menu = (
      <Menu>
        {MenuItems.map((menuItem, index) => (
          <Menu.Item key={index} icon={menuItem.icon}>
            {menuItem.tabName}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <StyledAppHeader>
        <AvatarWrapper>
          <Dropdown.Button
            overlay={menu}
            placement="bottomCenter"
            icon={<UserOutlined />}
          />
        </AvatarWrapper>
      </StyledAppHeader>
    );
  }
}

export default Header;
