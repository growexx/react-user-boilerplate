import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../containers/constants';
import SecurityQuestionForm from '../SecurityQuestionForm';
import { postSecurityQuestionRegister } from '../stub';
import { StyledSecurityQuestion } from '../StyledSecurityQuestion';

function ResetPassword() {
  // console.log('props')

  const history = useHistory();
  const handleSubmit = data => {
    postSecurityQuestionRegister(data).then(() => {
      history.push(ROUTES.PASSWORD_CHANGE);
    });
  };
  return (
    <StyledSecurityQuestion>
      <h2>Please Verify your security question</h2>
      <SecurityQuestionForm handleSubmit={handleSubmit} isReset />
    </StyledSecurityQuestion>
  );
}

export default ResetPassword;
