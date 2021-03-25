/* eslint-disable react/no-array-index-key */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

/* eslint-disable no-sparse-arrays */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

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
  const favIcons = [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      href: require('../../images/favicons/android-chrome-512x512.png'),
    },

    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      href: require('../../images/favicons/android-chrome-192x192.png'),
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: require('../../images/favicons/favicon-32x32.png'),
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: require('../../images/favicons/favicon-16x16.png'),
    },
    {
      rel: 'apple-touch-icon',
      href: require('../../images/favicons/apple-touch-icon.png'),
    },
  ];
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
        {favIcons.map((favIcon, index) => (
          <link {...favIcon} key={index} />
        ))}
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
