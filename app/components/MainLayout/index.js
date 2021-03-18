/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import App from 'containers/App';
import SideBar from '../SideBar/SideBar';
import StyledMainLayout from './StyledMainLayout';
const { Header, Footer, Content } = Layout;

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
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'sideBarTrigger',
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
              <App />
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </StyledMainLayout>
    );
  }
}

export default MainLayout;
