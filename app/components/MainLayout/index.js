/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/**
 * MainLayout.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import App from 'containers/App';
import Footer from 'components/Footer';
import AppHeader from 'components/Header';
import SideBar from 'components/SideBar';
import { StyledMainLayout, ToggleBreadCrumb } from './StyledMainLayout';
const { Header, Content } = Layout;

class MainLayout extends React.Component {
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
    return (
      <StyledMainLayout>
        <Layout>
          <SideBar collapsed={this.state.collapsed} />
          <Layout className="site-layout">
            <Header className="headerLayout">
              <ToggleBreadCrumb>
                <span
                  className="sideBarTrigger"
                  onClick={this.toggle}
                  data-testid="ToggleIcon"
                >
                  {this.state.collapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )}
                </span>
              </ToggleBreadCrumb>
              <AppHeader />
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <App />
            </Content>
            <Layout className="site-layout">
              <Footer />
            </Layout>
          </Layout>
        </Layout>
      </StyledMainLayout>
    );
  }
}

export default MainLayout;
