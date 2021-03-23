/**
 *
 * Registration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Input, Button } from 'antd';
import {
  FacebookFilled,
  GoogleOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import messages from './messages';
import { StyledRegistration } from './StyledRegistration';

export function Registration() {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
        <meta name="description" content="Description of Registration" />
      </Helmet>
      <StyledRegistration>
        <p className="createAccount">
          <FormattedMessage {...messages.createAccount} />
        </p>
        <div className="registrationSubContainer">
          <div className="socialIcons">
            <FacebookFilled />
            <GoogleOutlined />
            <WindowsFilled />
          </div>
          <p className="emailRegistration">
            <FormattedMessage {...messages.emailRegistration} />
          </p>
          <div className="accountData">
            <Input defaultValue="Name" />
            <Input defaultValue="Email" />
            <Input defaultValue="Password" />
          </div>
          <Button>
            <FormattedMessage {...messages.signUp} />
          </Button>
        </div>
      </StyledRegistration>
    </div>
  );
}

Registration.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Registration;
