import React from 'react';
import { Form, Input, Button } from 'antd';

function PasswordChange() {
  return (
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
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {/* <Checkbox>Remember me</Checkbox> */}
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
  );
}

export default PasswordChange;
