// /* eslint-disable indent */
// /* eslint-disable prettier/prettier */
import React from 'react';
import { Select, Input } from 'antd';
import PropTypes from 'prop-types';
import { StyledSelectInput } from './StylesSelectInput';
const { Option } = Select;
function SelectInput(props) {
  const {
    defaultValue,
    onSelectChange,
    selectOptions = [],
    selectName,
    placeholder,
    onChange,
    inputName,
  } = props;

  return (
    <StyledSelectInput>
      <Select
        defaultValue={defaultValue}
        className="input-select"
        onChange={onSelectChange}
        name={selectName}
      >
        {selectOptions.length > 0 &&
          selectOptions.map(option => {
            if (option.isVisible !== undefined && !option.isVisible) {
              return null;
            }
            return (
              <Option key={option.id} value={option.value}>
                {option.name}
              </Option>
            );
          })}
      </Select>
      <Input
        className="answer"
        placeholder={placeholder}
        onChange={onChange}
        name={inputName}
      />
    </StyledSelectInput>
  );
}
SelectInput.propTypes = {
  defaultValue: PropTypes.string,
  onSelectChange: PropTypes.func,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  selectName: PropTypes.string,
  inputName: PropTypes.string,
};
export default SelectInput;
