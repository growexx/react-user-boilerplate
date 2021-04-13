/* eslint-disable react/no-array-index-key */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import Profile from 'containers/Profile/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import UnauthorizedPage from 'containers/UnauthorizedPage/Loadable';
import FontAwesomeDemo from 'examples/FontAwesomeDemo/Loadable';
import Login from 'containers/Auth/Login/Loadable';
import Logout from 'containers/Auth/Logout/Loadable';
import Loader from 'examples/ListLoader/Loadable';
import Register from 'containers/Auth/Registration/Loadable';
import ExportDataToCsv from 'examples/ExportDataToCsv/Loadable';
import GraphQLDemo from 'examples/GraphQLDemo/Loadable';
import SampleForm from 'examples/SampleForm/Loadable';
import ChangePassword from 'containers/ChangePassword/Loadable';
import NumeralConversion from 'examples/NumeralConversion/Loadable';
import { FAV_ICONS } from './constants';
import PrivateRoute from './PrivateRoute';
import RoleMiddleWare from './RoleMiddleWare';
import AuthRoute from './AuthRoute';
import GlobalStyle from '../../global-styles';
import { ROUTES } from '../constants';
import { initGA, recordPageViewGA } from '../../utils/googleAnalytics';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
class App extends React.Component {
  componentDidMount() {
    // google analytics init
    initGA();

    // first time page render
    recordPageViewGA(this.props.location.pathname);
  }

  componentDidUpdate() {
    // record page view on every route change
    recordPageViewGA(this.props.location.pathname);
  }

  render() {
    return (
      <AppWrapper data-testid="AppRoutes">
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
          {FAV_ICONS.map((favIcon, index) => (
            <link {...favIcon} key={index} />
          ))}
        </Helmet>
        <Switch>
          <PrivateRoute exact path={ROUTES.HOME} component={HomePage} />
          <PrivateRoute path={ROUTES.FEATURES} component={FeaturePage} />
          <PrivateRoute
            path={ROUTES.FONT_AWESOME}
            component={FontAwesomeDemo}
          />
          <PrivateRoute path={ROUTES.LOGOUT} component={Logout} />
          <PrivateRoute path={ROUTES.LOADER} component={Loader} />
          <PrivateRoute path={ROUTES.EXPORT_DATA} component={ExportDataToCsv} />
          <PrivateRoute path={ROUTES.GRAPHQL_DEMO} component={GraphQLDemo} />
          <RoleMiddleWare
            path={ROUTES.TEST_ADMIN_PAGE}
            component={() => <div>This is Admin Role Page</div>}
            // ShowError redirects to 403
            showError
          />
          <PrivateRoute path={ROUTES.SAMPLE_FORM} component={SampleForm} />
          <PrivateRoute
            path={ROUTES.NUMERAL_CONVERTER}
            component={NumeralConversion}
          />
          <PrivateRoute
            path={ROUTES.CHANGE_PASSWORD}
            component={ChangePassword}
          />
          <PrivateRoute path={ROUTES.PROFILE} component={Profile} />

          <AuthRoute exact path={ROUTES.LOGIN} component={Login} />
          <AuthRoute exact path={ROUTES.REGISTER} component={Register} />
          <Route
            exact
            path={ROUTES.UNAUTHORIZED}
            component={UnauthorizedPage}
          />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

export default withRouter(App);

App.propTypes = {
  location: PropTypes.object,
};
