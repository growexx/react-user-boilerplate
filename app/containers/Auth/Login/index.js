/**
 *
 * Login
 *
 */

import React from 'react';
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
    <StyledLogin>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
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
  );
}

export default Login;
