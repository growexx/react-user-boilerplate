import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import messages from './messages';
import { StyledAuthContainer } from './StyledAuthContainer';
import { AUTH_TYPE } from './constants';
import { Login } from './Login';
import { Registration } from './Registration';

const getLoginSideContent = () => (
  <div className="loginContainer">
    <div className="registrationSideContainer">
      <p className="title">
        <FormattedMessage {...messages.sidebarLoginTitle} />
      </p>
      <p className="subTitle">
        <FormattedMessage {...messages.sidebarLoginSubtitle} />
      </p>
      <Button>
        <FormattedMessage {...messages.sidebarSignUp} />
      </Button>
    </div>
  </div>
);
const getRegisterSideContent = () => (
  <div className="registrationSideContainer">
    <p className="title">
      <FormattedMessage {...messages.sidebarRegistrationTitle} />
    </p>
    <p className="subTitle">
      <FormattedMessage {...messages.sidebarRegistrationSubtitle} />
    </p>
    <Button>
      <FormattedMessage {...messages.sidebarLogin} />
    </Button>
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
