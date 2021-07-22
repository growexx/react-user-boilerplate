/* eslint-disable no-param-reassign */
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectInput from './SelectInput';
import { getSecurityQuestions } from './stub';
import { StyledSecurityQuestion } from './StyledSecurityQuestion';
const selectedItems = {};
function SecurityQuestionForm(props) {
  const { handleSubmit } = props;
  const [options, setOptions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  useEffect(() => {
    getSecurityQuestions().then(res => {
      setOptions(
        res.data.map(item => {
          // eslint-disable-next-line dot-notation
          item['isVisible'] = true;
          return item;
        }),
      );
    });
  }, []);

  const handleSelect = (value, option, name) => {
    // options.forEach(item => {
    //   if (item.value === option.value) {
    //     selectedItems[item.id] = option;
    //   }
    //   if (selectedQuestion) {
    //     Object.values(selectedQuestion).forEach(selectedItem => {
    //       // console.log('selectedItem',selectedItem)
    //       if (selectedItem.value === item.value) {
    //         selectedItems[item.id] = selectedItem;
    //       }
    //     });
    //   }
    // });
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

  return (
    <StyledSecurityQuestion>
      <SelectInput
        defaultValue="-- Choose a Security Question --"
        selectOptions={options}
        onSelectChange={(value, option) =>
          handleSelect(value, option, 'question1')
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
        placeholder="Answer"
        onChange={handleAnswer}
        selectName="question2"
        inputName="answer2"
      />
      <SelectInput
        defaultValue="-- Choose a Security Question --"
        selectOptions={options}
        onSelectChange={(value, option) =>
          handleSelect(value, option, 'question3')
        }
        placeholder="Answer"
        onChange={handleAnswer}
        selectName="question3"
        inputName="answer3"
      />

      <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </StyledSecurityQuestion>
  );
}
SecurityQuestionForm.propTypes = {
  handleSubmit: PropTypes.func,
};
export default SecurityQuestionForm;
