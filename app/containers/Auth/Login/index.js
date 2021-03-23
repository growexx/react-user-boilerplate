/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Input, Button } from 'antd';
import {
  FacebookFilled,
  GoogleOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import messages from './messages';
import { StyledLogin } from './StyledLogin';

export function Login() {
  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <StyledLogin>
        <p className="createAccount">
          <FormattedMessage {...messages.accountDetails} />
        </p>
        <div className="LoginSubContainer">
          <div className="socialIcons">
            <FacebookFilled />
            <GoogleOutlined />
            <WindowsFilled />
          </div>
          <p className="emailLogin">
            <FormattedMessage {...messages.emailLogin} />
          </p>
          <div className="accountData">
            <Input defaultValue="Email" />
            <Input defaultValue="Password" />
          </div>
          <Button>
            <FormattedMessage {...messages.signIn} />
          </Button>
        </div>
      </StyledLogin>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Login;
