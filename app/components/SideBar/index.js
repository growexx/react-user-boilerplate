/**
 * SideBar/index.js
 *
 * This is the SideBar Component File.
 */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { ROUTES } from 'containers/constants';
import GrowExxTriangleLogo from '../../images/Growexx-Triangle-White.png';
import GrowExxLogo from '../../images/GrowExx_Group_Logo.png';
import { GET_FILTERED_MENU_ITEM } from './Constants';

const { Sider } = Layout;
const getRouteIndex = props => {
  const route = GET_FILTERED_MENU_ITEM(props.user && props.user.role).find(
    menu => menu.to === props.location.pathname,
  );
  return route.key;
};

const SideBar = props => (
  <Sider
    trigger={null}
    collapsible
    collapsed={props.collapsed}
    id="components-layout-demo-custom-trigger"
  >
    <div className="logo">
      <Link to={ROUTES.HOME}>
        {!props.collapsed ? (
          <img src={GrowExxLogo} alt="logo" />
        ) : (
          <img src={GrowExxTriangleLogo} alt="logo" />
        )}
      </Link>
    </div>
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[getRouteIndex(props)]}
      selectedKeys={[getRouteIndex(props)]}
    >
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
