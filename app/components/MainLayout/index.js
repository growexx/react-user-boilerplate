/**
 * MainLayout.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import React from 'react';
import { Layout, Spin } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAppLoading } from 'containers/App/selectors';
import App from 'containers/App';
import Footer from 'components/Footer';
import AppHeader from 'components/Header';
import SideBar from 'components/SideBar';
import Emitter from 'utils/events';
import { userExists, getUserData } from 'utils/Helper';
import { EMITTER_EVENTS } from 'utils/constants';
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
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  componentDidMount() {
    Emitter.on(EMITTER_EVENTS.LOG_IN, () => {
      this.forceUpdate();
    });
    Emitter.on(EMITTER_EVENTS.LOG_OUT, () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    Emitter.off(EMITTER_EVENTS.LOG_IN);
    Emitter.off(EMITTER_EVENTS.LOG_OUT);
  }

  render() {
    if (userExists()) {
      return (
        <Spin spinning={this.props.appLoading} size="default">
          <StyledMainLayout
            data-environment={
              process.env.NODE_ENV !== 'production'
                ? process.env.NODE_ENV
                : null
            }
            className="main-layout"
          >
            <Layout>
              <Layout>
                <SideBar
                  collapsed={this.state.collapsed}
                  user={getUserData()}
                />
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
        </Spin>
      );
    }

    return <App />;
  }
}

MainLayout.propTypes = {
  appLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  appLoading: makeSelectAppLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(MainLayout);
