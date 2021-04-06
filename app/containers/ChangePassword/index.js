/**
 *
 * ChangePassword
 *
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import * as formValidations from 'utils/formValidations';
import { Form, Button, notification } from 'antd';
import { APassword } from 'utils/Fields';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import {
  makeSelectConfirmNewPassword,
  makeSelectCurrentPassword,
  makeSelectNewPassword,
  makeSelectSuccess,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { passwordsMustMatch } from './constants';
import { fireSubmit, updateField as updateAction } from './actions';

const FormItem = Form.Item;

const FORM_KEY = 'ChangePassword';
export class ChangePassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showNotification = (err, type) => {
    if (type === 'error') {
      notification.error({
        message: <FormattedMessage {...messages.notificationToastError} />,
        description: err,
      });
    } else {
      notification.success({
        message: <FormattedMessage {...messages.notificationToastSuccess} />,
        description: err,
      });
    }
  };

  render() {
    const {
      invalid,
      error,
      loading,
      success,
      currentPassword,
      newPassword,
      confirmNewPassword,
      pristine,
      reset,
      submitting,
      updateField,
      submitData,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>ChangePassword</title>
          <meta name="description" content="Description of ChangePassword" />
        </Helmet>
        <Form
          onFinish={() => {
            submitData();
            reset();
          }}
        >
          <Field
            label="Current Password"
            name="currentPassword"
            component={APassword}
            placeholder="Current Password"
            onChange={updateField}
            hasFeedback
            value={currentPassword}
          />

          <Field
            label="New Password"
            name="newPassword"
            component={APassword}
            placeholder="New Password"
            onChange={updateField}
            value={newPassword}
          />

          <Field
            label="Confirm Password"
            name="confirmNewPassword"
            component={APassword}
            placeholder="Confirm Password"
            onChange={updateField}
            value={confirmNewPassword}
          />
          <FormItem>
            <center>
              <Button
                loading={loading}
                type="primary"
                disabled={pristine || submitting || invalid}
                htmlType="submit"
              >
                Submit
              </Button>
            </center>
          </FormItem>
          {error && this.showNotification(error.message, 'error')}
          {success && this.showNotification(success, 'success')}
        </Form>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  updateField: PropTypes.func.isRequired,
  submitData: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  currentPassword: PropTypes.any,
  newPassword: PropTypes.any,
  confirmNewPassword: PropTypes.any,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  currentPassword: makeSelectCurrentPassword(),
  newPassword: makeSelectNewPassword(),
  confirmNewPassword: makeSelectConfirmNewPassword(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateField: evt => {
      dispatch(updateAction(evt.target.name, evt.target.value));
    },
    submitData: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fireSubmit());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({
  key: FORM_KEY,
  reducer,
});

const withSaga = useInjectSaga({ key: FORM_KEY, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: FORM_KEY,
    fields: ['currentPassword', 'newPassword', 'confirmNewPassword'],
    validate: formValidations.createValidator({
      currentPassword: [formValidations.required],
      newPassword: [formValidations.required],
      confirmNewPassword: [formValidations.required, passwordsMustMatch],
    }),
    touchOnChange: true,
  }),
)(ChangePassword);
