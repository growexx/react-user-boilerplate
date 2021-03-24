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
import Register from 'containers/Auth/Registration/Loadable';
import PrivateRoute from './PrivateRoute';
import GlobalStyle from '../../global-styles';

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
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/features" component={FeaturePage} />
        <PrivateRoute path="/font-awesome" component={FontAwesomeDemo} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
