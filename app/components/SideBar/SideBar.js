/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import StyledSideBarWrapper from './StyledSideBarWrapper';

const { Header, Sider } = Layout;

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { Content } = Layout;
    return (
      <StyledSideBarWrapper>
        <Layout id="components-layout-demo-custom-trigger">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            {this.props.menu}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/features">Features</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                },
              )}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </StyledSideBarWrapper>
    );
  }
}
SideBar.propTypes = {
  menu: PropTypes.object,
  children: PropTypes.string,
};
export default SideBar;
