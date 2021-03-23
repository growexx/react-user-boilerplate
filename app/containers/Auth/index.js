import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { StyledAuthContainer } from './StyledAuthContainer';
import { AUTH_TYPE } from './constants';
import { Login } from './Login';
import { Registration } from './Registration';

const getLoginSideContent = () => (
  <div className="loginContainer">
    <div className="registrationSideContainer">
      <p className="title">New Here!</p>
      <p className="subTitle">
        To join us, please sign up with your personal info
      </p>
      <Button>SIGN UP</Button>
    </div>
  </div>
);
const getRegisterSideContent = () => (
  <div className="registrationSideContainer">
    <p className="title">Welcome Back!</p>
    <p className="subTitle">
      To keep connected with us, please log in with your personal info
    </p>
    <Button>SIGN IN</Button>
  </div>
);
const AuthContainer = props => (
  <StyledAuthContainer>
    <div className="sideContainer">
      {props.authType === AUTH_TYPE[0]
        ? getLoginSideContent()
        : getRegisterSideContent()}
    </div>
    {props.authType === AUTH_TYPE[0] ? <Login /> : <Registration />}
  </StyledAuthContainer>
);

export default AuthContainer;

AuthContainer.propTypes = {
  authType: PropTypes.string,
};
