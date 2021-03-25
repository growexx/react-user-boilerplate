/* eslint-disable space-before-function-paren */
import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { ROUTES } from '../Auth/constants';
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
              pathname: ROUTES.LOGIN,
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default PrivateRoute;
