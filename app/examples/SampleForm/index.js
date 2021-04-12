/**
 *
 * SampleForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import * as formValidations from 'utils/formValidations';
import { Form, Radio, Button, Select } from 'antd';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import {
  AInput,
  ARangePicker,
  ARadioGroup,
  ACheckbox,
  ASelect,
  ATextarea,
} from 'utils/Fields';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import { selectSampleFormDomain } from './selectors';
const FormItem = Form.Item;

const FORM_KEY = 'sampleForm';
const { Option } = Select;

export const SampleForm = props => {
  useInjectReducer({
    key: FORM_KEY,
    reducer,
  });
  useInjectSaga({ key: FORM_KEY, saga });
  const dispatch = useDispatch();
  useSelector(state => selectSampleFormDomain(state), shallowEqual);
  const { pristine, reset, submitting } = props;

  return (
    <div>
      <Helmet>
        <title>SampleForm</title>
        <meta name="description" content="Description of SampleForm" />
      </Helmet>
      <Form onSubmit={dispatch(actions.submitData())}>
        <Field
          label="First Name"
          name="firstName"
          component={AInput}
          placeholder="First Name"
          onChange={e =>
            dispatch(actions.updateField(e.target.name, e.target.value))
          }
          hasFeedback
        />

        <Field
          label="Last Name"
          name="lastName"
          component={AInput}
          placeholder="Last Name"
          onChange={e =>
            dispatch(actions.updateField(e.target.name, e.target.value))
          }
        />

        <Field
          label="Email"
          name="email"
          component={AInput}
          type="email"
          placeholder="Email"
          onChange={e =>
            dispatch(actions.updateField(e.target.name, e.target.value))
          }
        />

        <Field label="Sex" name="sex" component={ARadioGroup} value="male">
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Field>

        <Field
          label="Favorite Color"
          name="favoriteColor"
          component={ASelect}
          onChange={e => dispatch(actions.updateField('favoriteColor', e))}
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
          onChange={e =>
            dispatch(actions.updateField('employed', e.target.checked))
          }
        />

        <Field
          label="Filter dates"
          name="rangepicker"
          component={ARangePicker}
          placeholder={['From', 'To']}
          hasFeedback
          onFocus={e => e.preventDefault()}
          onChange={e => dispatch(actions.updateField('rangepicker', e))}
          onBlur={e => e.preventDefault()}
        />

        <Field
          data-testid="Notes"
          label="Notes"
          name="notes"
          component={ATextarea}
          onChange={e => dispatch(actions.updateField('Notes', e.target.value))}
        />

        <FormItem>
          <Button
            type="primary"
            disabled={pristine || submitting}
            htmlType="submit"
            style={{ marginRight: '10px' }}
            onClick={() => dispatch(actions.submitData())}
          >
            Submit
          </Button>

          <Button disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
SampleForm.propTypes = {
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: FORM_KEY,
  fields: ['firstName', 'email', 'rangePicker', 'employed', 'lastName'],
  validate: formValidations.createValidator({
    firstName: [formValidations.required],
    lastName: [formValidations.required],
    email: [formValidations.required, formValidations.validEmail],
  }),
  touchOnChange: true,
})(SampleForm);
