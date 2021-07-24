import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'containers/constants';
import { StyledResetPassword } from './StyledResetPasswordMain';

function ResetPasswordMain() {
  return (
    <StyledResetPassword>
      <h2 className="header">Reset Password</h2>
      <Link to={ROUTES.FORGOT_PASSWORD} className="link-reset">
        Reset Via Link
      </Link>
      <Link to={ROUTES.RESET_PASSWORD_SECURITY} className="link-security">
        Reset Via Security Question
      </Link>
    </StyledResetPassword>
  );
}

export default ResetPasswordMain;
