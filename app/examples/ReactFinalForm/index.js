/**
 *
 * ReactFinalForm
 *
 */

import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as AntdForm, Button, Radio, Select } from 'antd';
import { Helmet } from 'react-helmet';
import * as formValidations from 'utils/formValidations';
import {
  AInput,
  ARangePicker,
  ARadioGroup,
  ACheckbox,
  ASelect,
  ATextarea,
} from 'utils/Fields';
const { Option } = Select;
const FormItem = AntdForm.Item;
const onSubmit = values => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(values, 0, 2));
};

const ReactFinalForm = () => (
  <div>
    <div>
      <Helmet>
        <title>ReactFinalForm</title>
        <meta name="description" content="Description of ReactFinalForm" />
      </Helmet>
    </div>
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        submitting,
        pristine,
        form,
        invalid,
        values,
      }) => (
        <>
          <AntdForm onFinish={handleSubmit} onSubmit={handleSubmit}>
            <Field
              label="First Name"
              name="firstName"
              component={AInput}
              placeholder="First Name"
              hasFeedback
              validate={formValidations.required}
            />

            <Field
              label="Last Name"
              name="lastName"
              component={AInput}
              placeholder="Last Name"
              validate={formValidations.required}
            />

            <Field
              label="Email"
              name="email"
              component={AInput}
              type="email"
              placeholder="Email"
              validate={(formValidations.required, formValidations.validEmail)}
            />

            <Field
              label="Sex"
              name="sex"
              type="radio"
              value={values.sex}
              component={ARadioGroup}
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Field>

            <Field
              label="Favorite Color"
              name="favoriteColor"
              component={ASelect}
            >
              <Option value="ff0000">Red</Option>
              <Option value="00ff00">Green</Option>
              <Option value="0000ff">Blue</Option>
            </Field>

            <Field
              label="Employed"
              name="employed"
              id="employed"
              component={ACheckbox}
              type="checkbox"
            />

            <Field
              label="Filter dates"
              name="rangepicker"
              component={ARangePicker}
              placeholder={['From', 'To']}
              hasFeedback
              onFocus={e => e.preventDefault()}
              onBlur={e => e.preventDefault()}
            />

            <Field
              data-testid="Notes"
              label="Notes"
              name="notes"
              component={ATextarea}
            />

            <FormItem>
              <center>
                <Button
                  type="primary"
                  disabled={pristine || submitting}
                  htmlType="submit"
                  style={{ marginRight: '10px' }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>

                <Button
                  disabled={pristine || submitting || invalid}
                  onClick={form.reset}
                >
                  Clear Values
                </Button>
              </center>
            </FormItem>
          </AntdForm>
        </>
      )}
    />
  </div>
);

export default ReactFinalForm;
