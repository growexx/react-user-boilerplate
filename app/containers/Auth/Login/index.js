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
import { StyledAuthContainer } from '../StyledAuthContainer';
import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';

export function Login() {
  return (
    <StyledAuthContainer>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <AuthSideContainer authType={AUTH_TYPE[0]} />
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
    </StyledAuthContainer>
  );
}

export default Login;
