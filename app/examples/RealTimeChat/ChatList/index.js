/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyledChatList,
  SingleChatContainer,
  ChatListContainer,
} from './StyledChatList';
import { getMockChatList } from './stub';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      chatList: [],
    };
  }

  /**
   * getChatList - get chats from firebase
   */
  getChatList = () => {
    getMockChatList().then(res => {
      this.setState({
        chatList: res.data,
      });
    });
  };

  componentDidMount() {
    this.getChatList();
  }

  renderSingleChat = chat => (
    <SingleChatContainer>{chat.userName}</SingleChatContainer>
  );

  /**
   * renderAllChats
   * @returns list of chats
   */
  renderAllChats = () => {
    const { chatList } = this.state;
    return (
      <ChatListContainer>
        {chatList.map(singleChat => this.renderSingleChat(singleChat))}
      </ChatListContainer>
    );
  };

  render() {
    console.log(this.state.chatList, this.renderAllChats());
    return <StyledChatList>{this.renderAllChats()}</StyledChatList>;
  }
}

ChatList.propTypes = {};

export default ChatList;
