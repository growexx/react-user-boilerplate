/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { List, Avatar, Skeleton, Button, ConfigProvider, Empty } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import {
  getFireStoreCollectionReference,
  getDataFromReference,
  getFireStoreDocumentReference,
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
import { TEST_IDS, skeletonLoaderStub } from 'examples/RealTimeChat/stub';
import { NO_CHATS } from 'examples/RealTimeChat/constants';
import SearchUser from 'examples/RealTimeChat/SearchUser';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.unSubscribeToChatList = null;
  }

  /**
   * subscribeToChatList - real time updates for chat list
   */
  subscribeToChatList = () => {
    const { onChangeAppLoading, storeData, updateAction } = this.props;
    this.setState({
      loading: true,
    });

    this.unSubscribeToChatList = getFireStoreCollectionReference(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
    )
      .where(`joined.${storeData.currentUserRef.id}`, '==', true)
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
          this.setState({
            loading: false,
          });
        },
        error => {
          // eslint-disable-next-line no-console
          console.log('Error getting documents: ', error);
          onChangeAppLoading(false);
          this.setState({
            loading: false,
          });
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
      typeof this.unSubscribeToChatList === 'function'
    ) {
      this.unSubscribeToChatList();
      resetChatWindow(updateAction, 'chatList');
    }
  }

  /**
   * fetchPersonData
   * @param {*} person
   * @returns person data if found
   */
  fetchPersonData = async person => {
    const { onChangeAppLoading } = this.props;
    const docRef = await getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      person,
    );
    const returnData = await getDataFromReference(docRef)
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
        this.setState({
          loading: false,
        });
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
    const chatParticipants = Object.keys(item.joined);
    const chatSize = Object.keys(item.joined).length;
    for (let index = 0; index < chatSize; index++) {
      const apiData = await this.fetchPersonData(chatParticipants[index]);
      if (apiData) {
        if (chatSize === 2) {
          returnData = apiData;
          break;
        } else if (returnData.apiUserName) {
          returnData.apiUserName = `${returnData.apiUserName}, ${
            apiData.apiUserName
          }`;
          returnData.apiEmail = `${returnData.apiEmail}, ${apiData.apiEmail}`;
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
    const {
      updateAction,
      storeData: { selectedChatWindow },
    } = this.props;
    const { joined } = event;
    const isChatWindowOpen =
      selectedChatWindow && Object.keys(selectedChatWindow).length > 0;
    if (!isChatWindowOpen || !isEqual(selectedChatWindow, joined)) {
      updateAction('selectedChatWindow', joined);
      if (isChatWindowOpen) {
        updateAction('forceChatWindow', true);
      }
    }
  };

  /**
   * getLastMessage
   * @param {*} item
   * @returns last message
   */
  getLastMessage = item => {
    if (item.chats && item.chats.length > 0) {
      const {
        storeData: { currentUserRef },
      } = this.props;
      const { message, seen } = item.chats[item.chats.length - 1];
      const isLastMessageSeen = seen.includes(currentUserRef.id);
      return (
        <p
          className={
            isLastMessageSeen
              ? 'removeMarginLeft'
              : 'removeMarginLeft lastMessage'
          }
        >
          {message}
        </p>
      );
    }
    return '';
  };

  getActions = (isChatWindowOpen, item) => {
    const { loading } = this.state;
    return (
      <Button
        type="link"
        data-testid={TEST_IDS.OPEN_CHAT_WINDOW}
        onClick={() => this.handleChatListItem(item)}
        disabled={loading}
      >
        <RightCircleOutlined />
      </Button>
    );
  };

  /**
   * getEmptyContainer
   * @returns styled message for no container
   */
  getEmptyContainer = () => (
    <div className="emptyContainer">
      <p>{NO_CHATS}</p>
    </div>
  );

  /**
   * getEmptyList
   */
  getEmptyList = () => (
    <div className="noChatContainer">
      <Empty
        image={Empty.PRESENTED_IMAGE_DEFAULT}
        description={this.getEmptyContainer()}
      />
    </div>
  );

  /**
   * renderAllChats
   * @returns list of chats
   */
  renderAllChats = () => {
    const { loading } = this.state;
    const stubChatList = skeletonLoaderStub();
    const {
      storeData: { chatList, selectedChatWindow },
    } = this.props;
    let listData;
    if (loading) {
      listData = stubChatList;
    } else {
      listData = chatList;
    }
    const areChatsPresent = !loading && chatList.length > 0;

    const isChatWindowOpen =
      selectedChatWindow && Object.keys(selectedChatWindow).length > 0;
    return (
      <ChatListContainer>
        <div className={`searchBar ${isChatWindowOpen ? 'displayNone' : ''}`}>
          <center>
            <SearchUser />
          </center>
        </div>
        <div
          className={`demo-infinite-container ${
            isChatWindowOpen ? 'displayNone' : ''
          } ${!areChatsPresent ? 'borderNone' : ''}`}
        >
          <ConfigProvider renderEmpty={!areChatsPresent && this.getEmptyList}>
            <List
              dataSource={listData}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[this.getActions(isChatWindowOpen, item)]}
                >
                  <SingleChatContainer>
                    <Skeleton avatar title={false} loading={loading} active>
                      <List.Item.Meta
                        avatar={<Avatar src={API_ENDPOINTS.IMAGE_SRC} />}
                        title={item.name}
                        description={this.getLastMessage(item)}
                      />
                    </Skeleton>
                  </SingleChatContainer>
                </List.Item>
              )}
            />
          </ConfigProvider>
        </div>
      </ChatListContainer>
    );
  };

  render() {
    const {
      storeData: { selectedChatWindow },
    } = this.props;
    const isChatWindowOpen =
      selectedChatWindow && Object.keys(selectedChatWindow).length > 0;
    return (
      <StyledChatList
        className={`${!isChatWindowOpen ? 'chatWindowClosed' : ''}`}
      >
        {this.renderAllChats()}
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
