/* eslint-disable space-before-function-paren */
import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { userExists } from '../../utils/userExists';

const PrivateRoute = mainProps => {
  const { component: Component, ...rest } = mainProps;

  return (
    <Route
      {...rest}
      render={props =>
        userExists() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
