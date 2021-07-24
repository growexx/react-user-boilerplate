import React from 'react';
import SecurityQuestionForm from '../SecurityQuestionForm';

function ResetPassword() {
  const handleSubmit = () => {};
  return (
    <div>
      <h2>Please Verify your security question</h2>
      <SecurityQuestionForm handleSubmit={handleSubmit} isReset />
    </div>
  );
}

export default ResetPassword;
