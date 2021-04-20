/**
 *
 * OtpComponent
 *
 */
import React from 'react';
import OtpInput from 'react-otp-input';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

class OtpComponent extends React.PureComponent {
  render() {
    return (
      <OtpInput
        value={this.props.value}
        onChange={this.props.onChange}
        numInputs={this.props.numInputs}
        separator={this.props.separator}
        placeholder={this.props.placeholder}
        // container of inputs
        containerStyle=""
        // each input
        inputStyle=""
        // Style applied or class passed to inputs on focus.
        focusStyle=""
        isDisabled={this.props.isDisabled}
        // Style applied or class passed to each input when disabled.
        disabledStyle=""
        hasErrored={this.props.hasErrored}
        // Style applied or class passed to each input when errored.
        errorStyle=""
        shouldAutoFocus={this.props.shouldAutoFocus}
        // Restrict input to only numbers.
        isInputNum={this.props.isInputNum}
        // Masks input characters.
        isInputSecure={this.props.isInputSecure}
      />
    );
  }
}

OtpComponent.propTypes = {
  separator: PropTypes.node,
  numInputs: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
  hasErrored: PropTypes.bool,
  shouldAutoFocus: PropTypes.bool,
  isInputNum: PropTypes.bool,
  isInputSecure: PropTypes.bool,
};

OtpComponent.defaultProps = {
  separator: <span>-</span>,
  numInputs: 6,
  placeholder: '000000',
  isDisabled: false,
  hasErrored: false,
  shouldAutoFocus: true,
  isInputNum: true,
  isInputSecure: false,
};

export default OtpComponent;
