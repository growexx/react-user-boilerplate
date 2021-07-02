/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { List, Avatar, Skeleton, Button } from 'antd';
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
import makeSelectRealTimeChat from '../selectors';
import { updateField } from '../actions';
import { getDataFromReference } from '../../../utils/firebase';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      loading: false,
      hasMore: false,
    };
  }

  componentDidMount() {
    const { onChangeAppLoading } = this.props;

    onChangeAppLoading(true);
    // get list of chats
    const getDocReference = getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      getUserData().email,
    );
    getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.CHAT_WINDOW)
      .where('joined', 'array-contains', getDocReference)
      .get()
      .then(async querySnapshot => {
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
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
      });
  }

  handleInfiniteOnLoad = () => {
    /**
     * TODO: INFINITE LOADING PENDING
     */
  };

  /**
   * fetchPersonData
   * @param {*} person
   * @returns person data if found
   */
  fetchPersonData = async person => {
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
    const { email } = event;
    updateAction('selectedChatEmail', email);
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
                      onClick={() => this.handleChatListItem(item)}
                    >
                      Chat
                    </Button>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <SingleChatContainer>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.name}
                        description={item.chats[item.chats.length - 1].message}
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
