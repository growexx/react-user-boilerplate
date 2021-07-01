/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledChatList } from './StyledChatList';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      chatList: [],
    };
  }

  componentDidMount() {}

  render() {
    return <StyledChatList>Chat List.................</StyledChatList>;
  }
}

ChatList.propTypes = {};

export default ChatList;
