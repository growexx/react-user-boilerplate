/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import App from 'containers/App';
import Footer from 'components/Footer';
import AppHeader from 'components/Header';
import SideBar from '../SideBar/SideBar';
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
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'sideBarTrigger',
                    onClick: this.toggle,
                  },
                )}
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
