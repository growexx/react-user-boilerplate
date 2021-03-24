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
import { userExists } from '../../utils/userExists';
const { Header, Content } = Layout;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  render() {
    if (userExists()) {
      return (
        <StyledMainLayout>
          <Layout>
            <Layout>
              <SideBar collapsed={this.state.collapsed} />
              <Layout className="site-layout">
                <Header className="headerLayout">
                  <ToggleBreadCrumb>
                    <span
                      className="sideBarTrigger"
                      onClick={this.toggle}
                      data-testid="ToggleIcon"
                      onKeyDown={this.toggle}
                      role="button"
                      tabIndex={0}
                      aria-label="Navigation Toggle"
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
          </Layout>
        </StyledMainLayout>
      );
    }

    return <App />;
  }
}

export default MainLayout;
