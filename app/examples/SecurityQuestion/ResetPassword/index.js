import React from 'react';
import SecurityQuestionForm from '../SecurityQuestionForm';
import { StyledSecurityQuestion } from '../StyledSecurityQuestion';

function ResetPassword() {
  const handleSubmit = () => {};
  return (
    <StyledSecurityQuestion>
      <h2>Please Verify your security question</h2>
      <SecurityQuestionForm handleSubmit={handleSubmit} isReset />
    </StyledSecurityQuestion>
  );
}

export default ResetPassword;
