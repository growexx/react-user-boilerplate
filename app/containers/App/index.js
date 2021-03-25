/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import FontAwesomeDemo from 'containers/FontAwesomeDemo/Loadable';
import Login from 'containers/Auth/Login/Loadable';
import Logout from 'containers/Auth/Logout/Loadable';
import Register from 'containers/Auth/Registration/Loadable';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';
import GlobalStyle from '../../global-styles';
import { ROUTES } from '../Auth/constants';
const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <PrivateRoute exact path={ROUTES.HOME} component={HomePage} />
        <PrivateRoute path={ROUTES.FEATURES} component={FeaturePage} />
        <PrivateRoute path={ROUTES.FONTAWESOME} component={FontAwesomeDemo} />
        <PrivateRoute path={ROUTES.LOGOUT} component={Logout} />
        <AuthRoute exact path={ROUTES.LOGIN} component={Login} />
        <AuthRoute exact path={ROUTES.REGISTER} component={Register} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
