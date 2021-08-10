import React from 'react';
import { Form, Input, Button } from 'antd';
import { StyledResetPassword } from './StyledResetPasswordMain';
import AuthSideContainer from '../../../containers/Auth';
import { AUTH_TYPE } from '../../../containers/Auth/constants';

function PasswordChange() {
  return (
    <StyledResetPassword>
      <AuthSideContainer authType={AUTH_TYPE[0]} />
      <div className="main">
        <p className="title-reset">Reset Password</p>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="NewPassword"
            name="NewPassword"
            rules={[
              {
                required: true,
                message: 'Please input your NewPassword!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="confirmPassword"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input your confirmPassword!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </StyledResetPassword>
  );
}

export default PasswordChange;
