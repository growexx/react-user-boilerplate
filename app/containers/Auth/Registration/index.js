/**
 *
 * Registration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Input, Button } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  FacebookFilled,
  GoogleOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import makeSelectRegistration from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { StyledRegistration } from './StyledRegistration';

export function Registration() {
  useInjectReducer({ key: 'registration', reducer });
  useInjectSaga({ key: 'registration', saga });

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

const mapStateToProps = createStructuredSelector({
  registration: makeSelectRegistration(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Registration);
