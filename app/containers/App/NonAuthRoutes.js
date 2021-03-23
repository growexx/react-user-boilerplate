/**
 *
 * App
 *
 * Non auth routes
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AuthContainer from 'containers/Auth/Loadable';
import GlobalStyle from '../../global-styles';
import { AUTH_TYPE } from '../Auth/constants';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route
          path="/login"
          component={() => <AuthContainer authType={AUTH_TYPE[0]} />}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
