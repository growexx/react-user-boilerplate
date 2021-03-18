/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MenuItems } from './Constants';
// import StyledSideBarWrapper from './StyledSideBarWrapper';

const { Sider } = Layout;

const SideBar = props => (
  <Sider
    trigger={null}
    collapsible
    collapsed={props.collapsed}
    id="components-layout-demo-custom-trigger"
  >
    <div className="logo" />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {MenuItems.map((menu, i) => (
        <>
          <Menu.Item key={i} icon={menu.icon}>
            <Link to={menu.to}>{menu.tabName}</Link>
          </Menu.Item>
        </>
      ))}
    </Menu>
  </Sider>
);

export default SideBar;

SideBar.propTypes = {
  collapsed: PropTypes.bool,
};
