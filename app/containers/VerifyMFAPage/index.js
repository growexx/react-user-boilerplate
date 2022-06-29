import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants';
import { Input, Button, Form } from 'antd';

function VerifyMFAPage() {
  const [id, setId] = useState();
  const [uniqueString, setUniqueString] = useState();
  const [otp, setOtp] = useState();
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  useEffect(() => {
    const values = window.location.href.toString().split('/');
    setId(values[3]);
    setUniqueString(values[4]);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const obj = {
        userId: id,
        uniqueString,
        otp,
      };
      const { data } = await axios.post(
        `${API_ENDPOINTS.VERIFY_MFA}`,
        obj,
      );
      setMessage(data.data);
      setVariant('success');
    } catch (e) {
      setMessage(e.response.data.data);
      setVariant('warning');
    }
  }; 

  return (
    <div
      style={{
        display: 'block',
        width: '20%',
        padding: '2%',
        margin: '5% 38%',
        border: '2px solid black',
      }}
    >
      <p className="createAccount"><h2>Enter your OTP</h2></p>
      <div className="registrationSubContainer">
        <div className="accountData input-margin-0">
          <Form>
            <Form.Item name="otp">
              <Input placeholder="Enter OTP here" onChange={e => setOtp(e.target.value)}/>
            </Form.Item>
            <Form.Item name="submit">
              <center>
                <Button type="submit" htmlType="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </center>
            </Form.Item>
          </Form>
        </div>
      </div>
      <br />
      <div className={`${variant}`}>{message}</div>
    </div>
  );
}

export default VerifyMFAPage;
