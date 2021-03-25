/**
 *
 * Login
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Input, Button } from 'antd';
import {
  FacebookFilled,
  GoogleOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectEmail,
  makeSelectLoading,
  makeSelectError,
  makeSelectPassword,
} from 'containers/Auth/Login/selectors';
import messages from './messages';
import { StyledLogin } from './StyledLogin';
import { StyledAuthContainer } from '../StyledAuthContainer';
import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { makeSelectSuccess } from './selectors';
import { changeEmail, changePassword, fireLogin } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'login';
export function Login({
  error,
  loading,
  onSignIn,
  success,
  onChangeEmail,
  onChangePassword,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return (
    <StyledAuthContainer>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <AuthSideContainer authType={AUTH_TYPE[0]} />
      <StyledLogin>
        <p className="createAccount">
          <FormattedMessage {...messages.accountDetails} />
        </p>
        <div className="LoginSubContainer">
          <div className="socialIcons">
            <FacebookFilled />
            <GoogleOutlined />
            <WindowsFilled />
          </div>
          <p className="emailLogin">
            <FormattedMessage {...messages.emailLogin} />
          </p>
          <div className="accountData">
            <Input placeholder="Email" onChange={onChangeEmail} />
            <Input
              placeholder="Password"
              onChange={onChangePassword}
              type="password"
            />
          </div>
          <Button loading={loading} onClick={onSignIn}>
            <FormattedMessage {...messages.signIn} />
          </Button>
        </div>
      </StyledLogin>
    </StyledAuthContainer>
  );
}

Login.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  success: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSignIn: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
  onChangeEmail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onSignIn: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fireLogin());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
