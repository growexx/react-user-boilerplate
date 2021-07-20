/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import SelectInput from '../SelectInput';
import { getSecurityQuestions } from '../stub';
import { StyledRegisterQuestion } from './StyledRegisterQuestion';

const RegisterQuestion = () => {
  const [options, setOptions] = useState([]);

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
  const handleSelect = value => {
    setOptions(
      options.map(item => {
        if (item.value === value) {
          item.isVisible = false;
        } else {
          item.isVisible = true;
        }
        return item;
      }),
    );
  };
  const handleAnswer = e => {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
  };
  return (
    <StyledRegisterQuestion>
      <div className="container">
        <h3>Register Secuirty Question</h3>
        <SelectInput
          defaultValue="-- Choose a Security Question --"
          selectOptions={options}
          onSelectChange={handleSelect}
          placeholder="Answer"
          onChange={handleAnswer}
        />
      </div>
    </StyledRegisterQuestion>
  );
};

export default RegisterQuestion;
