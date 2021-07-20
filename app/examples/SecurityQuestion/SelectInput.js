/* eslint-disable prettier/prettier */
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
    selectProps,
    placeholder,
    onChange,
    inputProps,
  } = props;

  return (
    <StyledSelectInput>
      <Select
        defaultValue={defaultValue}
        className="input-select"
        onChange={onSelectChange}
        {...selectProps}
      >
        {selectOptions.length
          ? selectOptions.map(option => {
            if (option.isVisible !== undefined && !option.isVisible) {
              return null;
            }
            return (
              <Option key={option.id} value={option.value}>
                {option.name}
              </Option>
            );
          })
          : null}
      </Select>
      <Input placeholder={placeholder} onChange={onChange} {...inputProps} />
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
  selectProps: PropTypes.any,
  inputProps: PropTypes.any,
};
export default SelectInput;
