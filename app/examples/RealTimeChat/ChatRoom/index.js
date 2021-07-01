/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ProfileImageMock from 'images/Growexx-Triangle.svg';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Avatar } from 'antd';
import { StyledChatRoom } from './StyledChatRoom';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      userChats: [],
    };
  }

  componentDidMount() {}

  handleFormSubmit = () => {};

  render() {
    return (
      <StyledChatRoom>
        <div className="chatRoomHeader">
          <p>Name of User</p>
          <Avatar icon={<UserOutlined />} />
        </div>
        <div className="messageContainer">
          <p className="messageReceived">chat message 1</p>
          <p className="messageSent">chat message 2</p>
        </div>
        <div className="messageInput">
          <Form.Item hasFeedback>
            <Input placeholder="Enter Your Message" />
          </Form.Item>
        </div>
      </StyledChatRoom>
    );
  }
}

ChatRoom.propTypes = {};

export default ChatRoom;
