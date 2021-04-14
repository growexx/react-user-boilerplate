/**
 *
 * ChangePassword
 *
 */

import React from 'react';
import { Form, Field } from 'react-final-form';
/* import { useMutation } from '@apollo/client'; */
import { Form as AntdForm, Button } from 'antd';
import { Helmet } from 'react-helmet';
import * as formValidations from 'utils/formValidations';
import { APassword } from 'utils/Fields';
import { passwordsMustMatch } from './constants';
import { showNotification } from './helper';

const FormItem = AntdForm.Item;
/**
 *  useMutation declaration
 *  const [putRates, { data }] = useMutation(PUT_RATES);
 */
const onSubmit = values => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(values, 0, 2));
  /**
   * NOTE : GRAPHQL MUTATION DEMO WITH REACT FINAL FORM
   */

  /* 
        calling the function returned by useMutation. add the variables to pass.
        putRates({ variables: { passwordValue: values } })
  */
  showNotification('Change Password Error', 'error');
  showNotification('Change Password Success', 'success');
};

const ChangePassword = () => (
  <div>
    <Helmet>
      <title>ChangePassword</title>
      <meta name="description" content="Description of ChangePassword" />
    </Helmet>
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        // form,
        submitting,
        pristine,
        values,
        invalid,
      }) => (
        <>
          <AntdForm
            onFinish={() => {
              handleSubmit();
              // form.reset();
            }}
          >
            <Field
              label="Current Password"
              name="currentPassword"
              placeholder="Current Password"
              component={APassword}
              value={values.currentPassword}
              validate={formValidations.required}
            />

            <Field
              label="New Password"
              name="newPassword"
              component={APassword}
              placeholder="New Password"
              value={values.newPassword}
              validate={formValidations.required}
            />
            <Field
              label="Confirm Password"
              name="confirmNewPassword"
              component={APassword}
              placeholder="Confirm Password"
              value={values.confirmNewPassword}
              validate={(formValidations.required, passwordsMustMatch)}
            />
            <FormItem>
              <center>
                <Button
                  type="primary"
                  disabled={pristine || submitting || invalid}
                  htmlType="submit"
                >
                  Submit
                </Button>
              </center>
            </FormItem>
          </AntdForm>
        </>
      )}
    />
  </div>
);

export default ChangePassword;
