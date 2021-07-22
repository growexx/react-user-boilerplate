import React from 'react';
import SecurityQuestionForm from '../SecurityQuestionForm';
import { StyledSecurityQuestion } from '../StyledSecurityQuestion';

const RegisterQuestion = () => {
  const handleSubmit = () => {};
  return (
    <StyledSecurityQuestion>
      <div className="container">
        <h3>Register Secuirty Question</h3>
        <SecurityQuestionForm handleSubmit={handleSubmit} />
      </div>
    </StyledSecurityQuestion>
  );
};

export default RegisterQuestion;
