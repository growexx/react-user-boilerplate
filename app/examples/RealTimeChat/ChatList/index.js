/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { List, message, Avatar, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
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
      loading: false,
      hasMore: true,
    };
  }

  /**
   * getChatList - get chats from firebase
   */
  getChatList = () => {
    const { chatList } = this.state;
    getMockChatList().then(res => {
      this.setState({
        chatList: chatList.concat(res.data),
      });
    });
  };

  componentDidMount() {
    this.getChatList();
  }

  handleInfiniteOnLoad = () => {
    const { chatList } = this.state;
    this.setState({
      loading: true,
      chatList: chatList.concat(
        [...new Array(3)].map(() => ({ loading: true, ...chatList[0] })),
      ),
    });
  };

  /**
   * renderAllChats
   * @returns list of chats
   */
  renderAllChats = () => {
    const { chatList, loading, hasMore } = this.state;
    return (
      <ChatListContainer>
        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!loading && hasMore}
          >
            <List
              dataSource={chatList}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <SingleChatContainer>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.userName}
                        description={item.latestMessage}
                      />
                    </SingleChatContainer>
                  </Skeleton>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </ChatListContainer>
    );
  };

  render() {
    return <StyledChatList>{this.renderAllChats()}</StyledChatList>;
  }
}

ChatList.propTypes = {};

export default ChatList;
