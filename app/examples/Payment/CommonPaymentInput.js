import { Button, Card, Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
function CommonPaymentInput(props) {
  const {
    inputPlaceholder = '',
    onInputChange,
    onLinkClick,
    onContinueClick,
    continueBtnDisable,
    inputValue,
  } = props;
  return (
    <Card bordered={false} className="common-payment-main">
      <div className="payment-main-card">
        <Input
          placeholder={inputPlaceholder}
          onChange={onInputChange}
          value={inputValue}
          suffix={
            <Button type="link" onClick={onLinkClick} disabled={!inputValue}>
              Link
            </Button>
          }
        />
        <Button
          className="continue-btn"
          type="primary"
          onClick={onContinueClick}
          disabled={continueBtnDisable}
        >
          Continue
        </Button>
      </div>
    </Card>
  );
}
CommonPaymentInput.propTypes = {
  inputPlaceholder: PropTypes.string,
  onInputChange: PropTypes.func,
  onLinkClick: PropTypes.func,
  onContinueClick: PropTypes.func,
  continueBtnDisable: PropTypes.bool,
  inputValue: PropTypes.string,
};

export default CommonPaymentInput;
