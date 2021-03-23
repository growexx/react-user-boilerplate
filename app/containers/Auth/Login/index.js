/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export function Login() {
  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Component" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Login;
