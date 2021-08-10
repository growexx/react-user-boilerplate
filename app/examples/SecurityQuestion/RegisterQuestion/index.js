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
        <p className="title-main">Set Security Question</p>
        <div className="question-form">
          <SecurityQuestionForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </StyledSecurityQuestion>
  );
};

export default RegisterQuestion;
