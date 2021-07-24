/* eslint-disable no-param-reassign */
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectInput from './SelectInput';
import { getRegisteredSecurityQuestion, getSecurityQuestions } from './stub';
import { StyledSecurityQuestion } from './StyledSecurityQuestion';
const selectedItems = {};
const questionList = {
  0: 'question1',
  1: 'question2',
  2: 'question3',
};
function SecurityQuestionForm(props) {
  const { handleSubmit, isReset } = props;
  const [options, setOptions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  useEffect(() => {
    if (isReset) {
      getRegisteredSecurityQuestion('abc@abc.com').then(res => {
        const newData = {};
        res.data.securityQuestions.forEach((item, index) => {
          newData[questionList[index]] = item;
        });
        setOptions(res.data.securityQuestions);
        setSelectedQuestion(newData);
      });
    } else {
      getSecurityQuestions().then(res => {
        setOptions(
          res.data.map(item => {
            Object.assign(item, { isvisible: true });
            return item;
          }),
        );
      });
    }
  }, []);

  const handleSelect = (value, option, name) => {
    setSelectedQuestion({ ...selectedQuestion, [name]: option });
  };
  const handleAnswer = e => {
    setSelectedAnswer({ ...selectedAnswer, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (selectedQuestion) {
      Object.keys(selectedQuestion).forEach(que => {
        options.forEach(option => {
          if (option.value === selectedQuestion[que].value) {
            selectedItems[que] = option.id;
          }
        });
      });
      const newOptions = options.map(item => {
        if (
          selectedItems &&
          selectedItems.question1 &&
          selectedItems.question1 === item.id
        ) {
          item.isVisible = false;
        } else if (
          selectedItems &&
          selectedItems.question2 &&
          selectedItems.question2 === item.id
        ) {
          item.isVisible = false;
        } else if (
          selectedItems &&
          selectedItems.question3 &&
          selectedItems.question3 === item.id
        ) {
          item.isVisible = false;
        } else {
          item.isVisible = true;
        }
        return item;
      });
      setOptions(newOptions);
    }
  }, [selectedQuestion]);

  const checkDisable = () => {
    if (
      selectedQuestion &&
      Object.values(selectedQuestion).length === 3 &&
      selectedAnswer &&
      Object.values(selectedAnswer).length === 3
    ) {
      return false;
    }
    return true;
  };

  return (
    <StyledSecurityQuestion>
      <SelectInput
        defaultValue="-- Choose a Security Question --"
        disabled={isReset}
        selectOptions={options}
        onSelectChange={(value, option) =>
          handleSelect(value, option, 'question1')
        }
        value={
          isReset
            ? selectedQuestion && selectedQuestion[questionList[0]].name
            : ''
        }
        placeholder="Answer"
        onChange={handleAnswer}
        selectName="question1"
        inputName="answer1"
      />
      <SelectInput
        defaultValue="-- Choose a Security Question --"
        selectOptions={options}
        onSelectChange={(value, option) =>
          handleSelect(value, option, 'question2')
        }
        value={
          isReset
            ? selectedQuestion && selectedQuestion[questionList[1]].name
            : ''
        }
        placeholder="Answer"
        onChange={handleAnswer}
        selectName="question2"
        inputName="answer2"
        disabled={isReset}
      />
      <SelectInput
        defaultValue="-- Choose a Security Question --"
        selectOptions={options}
        onSelectChange={(value, option) =>
          handleSelect(value, option, 'question3')
        }
        value={
          isReset
            ? selectedQuestion && selectedQuestion[questionList[2]].name
            : ''
        }
        placeholder="Answer"
        onChange={handleAnswer}
        selectName="question3"
        inputName="answer3"
        disabled={isReset}
      />

      <Button
        type="primary"
        onClick={() => handleSubmit({ selectedQuestion, selectedAnswer })}
        disabled={checkDisable()}
      >
        Submit
      </Button>
    </StyledSecurityQuestion>
  );
}
SecurityQuestionForm.propTypes = {
  handleSubmit: PropTypes.func,
  isReset: PropTypes.bool,
};
export default SecurityQuestionForm;
