/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { List, Avatar, Skeleton, Button } from 'antd';
import { UserOutlined, WechatOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import {
  getFireStoreCollectionReference,
  getDataFromReference,
} from 'utils/firebase';
import { getUserData } from 'utils/Helper';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import { loadApp } from 'containers/App/actions';
import { updateField } from 'examples/RealTimeChat/actions';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import {
  StyledChatList,
  SingleChatContainer,
  ChatListContainer,
} from 'examples/RealTimeChat/ChatList/StyledChatList';
import { resetChatWindow } from 'examples/RealTimeChat/helper';
import { TEST_IDS } from 'examples/RealTimeChat/stub';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      loading: false,
      hasMore: false,
    };
    this.unSubscribeToChatList = null;
  }

  /**
   * subscribeToChatList - real time updates for chat list
   */
  subscribeToChatList = () => {
    const { onChangeAppLoading, storeData } = this.props;
    onChangeAppLoading(true);

    this.unSubscribeToChatList = getFireStoreCollectionReference(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
    )
      .where('joined', 'array-contains', storeData.currentUserRef)
      .onSnapshot(
        async querySnapshot => {
          const result = [];
          const { docs } = querySnapshot;
          for (let i = 0; i <= docs.length; i++) {
            let name;
            let email;
            const data = docs[i] && docs[i].data();
            if (data) {
              await this.getPersonData(data).then(value => {
                const { apiUserName, apiEmail } = value;
                name = apiUserName;
                email = apiEmail;
              });
              result.push({
                ...data,
                name,
                email,
              });
            }
          }
          this.setState({
            chatList: [...result],
          });
          onChangeAppLoading(false);
        },
        error => {
          // eslint-disable-next-line no-console
          console.log('Error getting documents: ', error);
          onChangeAppLoading(false);
        },
      );
  };

  componentDidMount() {
    // get list of chats
    this.subscribeToChatList();
  }

  componentWillUnmount() {
    this.unSubscribeToChatList();
  }

  /**
   * TODO: INFINITE LOADING PENDING
   * handleInfiniteOnLoad = () => {};
   */

  /**
   * fetchPersonData
   * @param {*} person
   * @returns person data if found
   */
  fetchPersonData = async person => {
    const { onChangeAppLoading } = this.props;
    const returnData = await getDataFromReference(person)
      .then(data => {
        if (data.data().email !== getUserData().email) {
          return {
            apiUserName: data.data().userName,
            apiEmail: data.data().email,
          };
        }
        return undefined;
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
        onChangeAppLoading(false);
      });
    return returnData;
  };

  /**
   * getPersonData - iterates through joined members in chat and gives the name
   * @param {object} item - chat item
   * @returns name and email of the chat members
   */
  getPersonData = async item => {
    let returnData = {
      apiUserName: '',
      apiEmail: '',
    };
    const chatSize = item.joined.length;
    for (let index = 0; index < chatSize; index++) {
      const apiData = await this.fetchPersonData(item.joined[index]);
      if (apiData) {
        if (chatSize === 2) {
          returnData = apiData;
          break;
        } else if (returnData.apiUserName) {
          returnData.apiUserName = `${returnData.apiUserName},${
            apiData.apiUserName
          }`;
          returnData.apiEmail = `${returnData.apiEmail},${apiData.apiEmail}`;
        } else {
          returnData = apiData;
        }
      }
    }
    return returnData;
  };

  /**
   * handleChatListItem - to open chat window
   * @param {object} event
   */
  handleChatListItem = event => {
    const { updateAction } = this.props;
    const { joined } = event;
    resetChatWindow(updateAction);
    updateAction('selectedChatWindow', joined);
  };

  /**
   * getLastMessage
   * @param {*} item
   * @returns last message
   */
  getLastMessage = item => {
    if (item.chats && item.chats.length > 0) {
      return item.chats[item.chats.length - 1].message;
    }
    return '';
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
                <List.Item
                  key={item.id}
                  actions={[
                    <Button
                      type="button"
                      data-testid={TEST_IDS.OPEN_CHAT_WINDOW}
                      onClick={() => this.handleChatListItem(item)}
                    >
                      <WechatOutlined />
                    </Button>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <SingleChatContainer>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.name}
                        description={this.getLastMessage(item)}
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

ChatList.propTypes = {
  onChangeAppLoading: PropTypes.func,
  updateAction: PropTypes.func,
  storeData: PropTypes.object,
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
