/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  render() {
    return <StyledChatRoom>Chat Room</StyledChatRoom>;
  }
}

ChatRoom.propTypes = {};

export default ChatRoom;
