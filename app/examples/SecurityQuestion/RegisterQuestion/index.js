import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../containers/constants';
import SecurityQuestionForm from '../SecurityQuestionForm';
import { registerSecurityQuestion } from '../stub';
import { StyledSecurityQuestion } from '../StyledSecurityQuestion';

const RegisterQuestion = () => {
  const history = useHistory();
  const handleSubmit = data => {
    registerSecurityQuestion(data).then(() => {
      history.push(ROUTES.HOME);
    });
  };
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
