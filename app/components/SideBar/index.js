/* eslint-disable react/no-array-index-key */
/**
 * SideBar/index.js
 *
 * This is the SideBar Component File.
 */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import GrowExxTriangleLogo from '../../images/Growexx-Triangle-White.png';
import GrowExxLogo from '../../images/GrowExx_Group_Logo.png';
import { GET_FILTERED_MENU_ITEM } from './Constants';

const { Sider } = Layout;
const getRouteIndex = props => {
  let key = 1;
  // eslint-disable-next-line array-callback-return
  GET_FILTERED_MENU_ITEM(props.user && props.user.role).map(menu => {
    if (props.location.pathname === menu.to) {
      const { key: menuKey } = menu;
      key = menuKey;
    }
  });
  return key;
};

const SideBar = props => (
  <Sider
    trigger={null}
    collapsible
    collapsed={props.collapsed}
    id="components-layout-demo-custom-trigger"
  >
    <div className="logo">
      {!props.collapsed ? (
        <img src={GrowExxLogo} alt="logo" />
      ) : (
        <img src={GrowExxTriangleLogo} alt="logo" />
      )}
    </div>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={getRouteIndex(props)}>
      {GET_FILTERED_MENU_ITEM(props.user && props.user.role).map(menu => (
        <Menu.Item key={menu.key} icon={menu.icon}>
          <Link to={menu.to}>{menu.tabName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  </Sider>
);

export default withRouter(SideBar);

SideBar.propTypes = {
  collapsed: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
