/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { List, message, Avatar, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import {
  getFireStoreCollectionReference,
  getFireStoreDocumentReference,
} from 'utils/firebase';
import { getUserData } from 'utils/Helper';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import PropTypes from 'prop-types';
import { loadApp } from 'containers/App/actions';
import {
  StyledChatList,
  SingleChatContainer,
  ChatListContainer,
} from './StyledChatList';
import { getMockChatList } from './stub';
import makeSelectRealTimeChat from '../selectors';
import { updateField } from '../actions';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      chatList: [],
      loading: false,
      hasMore: false,
    };
  }

  componentDidMount() {
    const { updateAction, onChangeAppLoading } = this.props;

    onChangeAppLoading(true);
    // get list of chats
    const getDocReference = getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      getUserData().email,
    );
    getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.CHAT_WINDOW)
      .where('joined', 'array-contains', getDocReference)
      .get()
      .then(querySnapshot => {
        const result = [];
        querySnapshot.forEach(doc => {
          result.push(doc.data());
        });
        this.setState({
          loading: true,
          chatList: result,
        });
        onChangeAppLoading(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
      });
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

  // componentDidMount() {
  //   this.getChatList();
  // }

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
                        title={item.email}
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

ChatList.propTypes = {
  onChangeAppLoading: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  storeData: PropTypes.object,
  updateAction: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeAppLoading: loading => dispatch(loadApp(loading)),
    updateAction: (fieldName, fieldValue) => {
      dispatch(updateField(fieldName, fieldValue));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  storeData: makeSelectRealTimeChat(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChatList);
