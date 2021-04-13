/**
 * MainLayout.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import React from 'react';
import { Layout, Spin } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useSelector, shallowEqual } from 'react-redux';
import App from 'containers/App';
import Footer from 'components/Footer';
import AppHeader from 'components/Header';
import SideBar from 'components/SideBar';
import { selectGlobal } from 'containers/App/selectors';
import Emitter from 'utils/events';
import { userExists, getUserData } from 'utils/Helper';
import { EMITTER_EVENTS } from 'utils/constants';
import { StyledMainLayout, ToggleBreadCrumb } from './StyledMainLayout';
const { Header, Content } = Layout;

const MainLayout = () => {
  const globalState = useSelector(state => selectGlobal(state), shallowEqual);
  const [state, setState] = React.useState({
    collapsed: true,
  });

  const toggle = () => {
    const { collapsed } = state;
    setState({
      collapsed: !collapsed,
    });
  };

  React.useEffect(() => {
    Emitter.on(EMITTER_EVENTS.LOG_IN, () => {
      setState({
        collapsed: state.collapsed,
      });
    });
    return () => {
      Emitter.off(EMITTER_EVENTS.LOG_IN);
    };
  }, [state.eventEmitted]);

  if (userExists()) {
    return (
      <Spin spinning={globalState.appLoading} size="default">
        <StyledMainLayout>
          <Layout>
            <Layout>
              <SideBar collapsed={state.collapsed} user={getUserData()} />
              <Layout className="site-layout">
                <Header className="headerLayout">
                  <ToggleBreadCrumb>
                    <span
                      className="sideBarTrigger"
                      onClick={toggle}
                      data-testid="ToggleIcon"
                      onKeyDown={toggle}
                      role="button"
                      tabIndex={0}
                      aria-label="Navigation Toggle"
                    >
                      {state.collapsed ? (
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
      </Spin>
    );
  }

  return <App />;
};

export default MainLayout;
