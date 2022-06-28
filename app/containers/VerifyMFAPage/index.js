import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        'http://localhost:3003/auth/verify-mfa',
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
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h2>Enter your OTP</h2>
            <Form>
              <Form.Group className="mb-3" controlId="otp">
                <Form.Control
                  type="text"
                  placeholder="Enter OTP here"
                  onChange={e => setOtp(e.target.value)}
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <br />
      <div className={`${variant}`}>{message}</div>
    </div>
  );
}

export default VerifyMFAPage;
