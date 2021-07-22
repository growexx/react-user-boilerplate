/**
 *
 * InlineEdit
 *
 */

import React, { memo } from 'react';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { ESC_KEY_CODE } from 'components/InlineEdit/constants';
import { StyledInlineInput } from 'components/InlineEdit/StyledInlineInput';
import { TEST_IDS } from 'components/InlineEdit/stub';
class InlineEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInputActive: false,
      inputValue: props.value,
    };
  }

  onSave = () => {
    const { inputValue } = this.state;
    const { onSave } = this.props;
    onSave(inputValue);
    this.setState({
      isInputActive: false,
    });
  };

  onCancel = () => {
    const { value } = this.props;
    this.setState({
      inputValue: value,
      isInputActive: false,
    });
  };

  handleKeyDown = e => {
    if (e.keyCode === ESC_KEY_CODE) {
      this.onCancel();
    }
  };

  handleOnChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleDoubleClick = () => {
    this.setState({
      isInputActive: true,
    });
  };

  saveIcon = () => (
    <Button
      type="link"
      onClick={this.onSave}
      data-testid={TEST_IDS.SAVE_BUTTON}
    >
      <FontAwesomeIcon icon={faCheck} />
    </Button>
  );

  cancelIcon = () => (
    <Button
      type="link"
      onClick={this.onCancel}
      data-testid={TEST_IDS.CANCEL_BUTTON}
    >
      <FontAwesomeIcon icon={faTimes} />
    </Button>
  );

  addonAfterView = () => (
    <span>
      {this.saveIcon()}
      {this.cancelIcon()}
    </span>
  );

  render() {
    const { inputValue, isInputActive } = this.state;
    const { value, placeholder } = this.props;
    return (
      <StyledInlineInput>
        {!isInputActive ? (
          <div
            data-testid={TEST_IDS.INPUT_VALUE}
            onDoubleClick={this.handleDoubleClick}
            className="inputValue"
          >
            {value}
          </div>
        ) : (
          <Input
            placeholder={placeholder}
            suffix={this.addonAfterView()}
            value={inputValue}
            onChange={this.handleOnChange}
            allowClear
            onBlur={this.onSave}
            onPressEnter={this.onSave}
            onKeyDown={this.handleKeyDown}
            data-testid={TEST_IDS.INPUT_EDIT}
          />
        )}
      </StyledInlineInput>
    );
  }
}

InlineEdit.propTypes = {
  value: PropTypes.string,
  onSave: PropTypes.func,
  placeholder: PropTypes.string,
};

export default memo(InlineEdit);
