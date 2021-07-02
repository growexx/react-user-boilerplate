/* eslint-disable no-unused-vars */
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
import { getMockChatList } from './stub';
import makeSelectRealTimeChat from '../selectors';
import { updateField } from '../actions';
import { getDataFromReference } from '../../../utils/firebase';

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
      .then(async querySnapshot => {
        const result = [];
        const { docs } = querySnapshot;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= docs.length; i++) {
          let name;
          let email;
          const data = docs[i] && docs[i].data();
          if (data) {
            // eslint-disable-next-line no-await-in-loop
            await this.fetchPersonName(data).then(value => {
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

  handleInfiniteOnLoad = () => {
    /**
     * TODO: INFINITE LOADING PENDING
     */
  };

  fetchPersonName = async item =>
    getDataFromReference(item.joined[0])
      .then(data => {
        if (data.data().email === getUserData().email) {
          getDataFromReference(item.joined[1])
            .then(subData => ({
              apiUserName: subData.data().userName,
              apiEmail: subData.data().email,
            }))
            .catch(error => {
              // eslint-disable-next-line no-console
              console.log('Error getting documents: ', error);
            });
        }
        return {
          apiUserName: data.data().userName,
          apiEmail: data.data().email,
        };
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
      });

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
                      More
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
