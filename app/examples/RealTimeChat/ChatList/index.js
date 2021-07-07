/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { List, Avatar, Skeleton, Button } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import {
  getFireStoreCollectionReference,
  getDataFromReference,
} from 'utils/firebase';
import { getUserData } from 'utils/Helper';
import { FIRESTORE_COLLECTIONS, API_ENDPOINTS } from 'containers/constants';
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
import SearchUser from 'examples/RealTimeChat/SearchUser';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: false,
    };
    this.unSubscribeToChatList = null;
  }

  /**
   * subscribeToChatList - real time updates for chat list
   */
  subscribeToChatList = () => {
    const { onChangeAppLoading, storeData, updateAction } = this.props;
    onChangeAppLoading(true);

    this.unSubscribeToChatList = getFireStoreCollectionReference(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
    )
      .where('joined', 'array-contains', storeData.currentUserRef)
      .orderBy('chats')
      .orderBy('createdAt')
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
          updateAction('chatList', [...result]);
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
    const { updateAction } = this.props;
    if (
      this.unSubscribeToChatList !== null &&
      this.unSubscribeToChatList instanceof Function
    ) {
      this.unSubscribeToChatList();
      resetChatWindow(updateAction);
    }
  }

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
    const { loading, hasMore } = this.state;
    const {
      storeData: { chatList, selectedChatWindow },
    } = this.props;
    const isChatWindowOpen =
      selectedChatWindow && selectedChatWindow.length > 0;
    return (
      <ChatListContainer>
        <div
          className={`searchBar ${
            isChatWindowOpen ? 'displayNone' : 'chatWindowClosed'
          }`}
        >
          <center>
            <SearchUser />
          </center>
        </div>
        <div
          className={`demo-infinite-container ${
            isChatWindowOpen ? 'displayNone' : 'chatWindowClosed'
          }`}
        >
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
                      type="link"
                      data-testid={TEST_IDS.OPEN_CHAT_WINDOW}
                      onClick={() => this.handleChatListItem(item)}
                    >
                      <RightCircleOutlined />
                    </Button>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <SingleChatContainer>
                      <List.Item.Meta
                        avatar={<Avatar src={API_ENDPOINTS.IMAGE_SRC} />}
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
    const {
      storeData: { chatList },
    } = this.props;
    return (
      <StyledChatList>
        {chatList.length > 0 && this.renderAllChats()}
      </StyledChatList>
    );
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
