/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button } from 'antd';
import {
  getDataFromReference,
  getFireStoreDocumentData,
  getFireStoreDocumentReference,
  setFirestoreDocumentData,
} from 'utils/firebase';
import { getUserData } from 'utils/Helper';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import { loadApp } from 'containers/App/actions';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import { StyledChatRoom } from 'examples/RealTimeChat/ChatRoom/StyledChatRoom';
import { updateField } from 'examples/RealTimeChat/actions';
import { getUniqueId, resetChatWindow } from 'examples/RealTimeChat/helper';
import { TEST_IDS } from 'examples/RealTimeChat/stub';
import chatImage from 'images/chat_image.jpg';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChats: [],
      messageToSend: '',
    };
    this.unSubscribeToWindow = null;
    this.currentChatWindow = null;
  }

  /**
   * setInitialChats
   * @param {String}} uniqueId
   * @param {Object} data
   */
  setInitialChats = (uniqueId, data) => {
    this.currentChatWindow = uniqueId;
    this.setState({
      userChats: data.chats,
    });
  };

  /**
   * createNewChatWindow - if window does not exits it creates one
   */
  createNewChatWindow = async uniqueId => {
    const {
      storeData: { selectedChatWindow, currentUserRef },
      onChangeAppLoading,
    } = this.props;
    const payload = {
      chats: [],
      createdAt: new Date(),
      createdBy: currentUserRef,
      joined: selectedChatWindow,
    };
    await setFirestoreDocumentData(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
      uniqueId,
      payload,
      {},
    )
      .then(async () => {
        this.setInitialChats(uniqueId, payload);
        await this.setUserRefsAndValues(payload);
        await this.subscribeToWindow(uniqueId);
        // eslint-disable-next-line no-console
        console.log('Document written with ID: ', uniqueId);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error adding document: ', error);
        onChangeAppLoading(false);
      });
  };

  /**
   * subscribeToWindow - listen to updates in chat
   * @param {firebase chat window reference} chatWindow
   */
  subscribeToWindow = async chatWindow => {
    this.unSubscribeToWindow = getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
      chatWindow,
    ).onSnapshot(doc => {
      this.setState({
        userChats: doc.data().chats,
      });
    });
  };

  /**
   * fetchPersonData
   * @param {object} person
   * @returns value from reference
   */
  fetchPersonData = async person => {
    const { onChangeAppLoading } = this.props;
    const returnData = await getDataFromReference(person)
      .then(data => data.data())
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
        onChangeAppLoading(false);
      });
    return returnData;
  };

  /**
   * setUserRefsAndValues
   * @param {object} data
   */
  setUserRefsAndValues = async data => {
    const { joined } = data;
    const { updateAction } = this.props;

    const newRefs = [];
    const newValues = [];
    for (let index = 0; index < joined.length; index++) {
      const userValue = await this.fetchPersonData(joined[index]);
      if (userValue.email === getUserData().email) {
        updateAction('currentUserValue', userValue);
      } else {
        newRefs.push(joined[index]);
        newValues.push(userValue);
      }
    }
    updateAction('receiverUserRefs', newRefs);
    updateAction('receiverUserValues', newValues);
  };

  /**
   * setCurrentChatWindow - initialize current chat window
   */
  setCurrentChatWindow = async () => {
    const {
      storeData: { selectedChatWindow },
      onChangeAppLoading,
    } = this.props;
    const uniqueId = getUniqueId(selectedChatWindow);
    onChangeAppLoading(true);
    getFireStoreDocumentData(FIRESTORE_COLLECTIONS.CHAT_WINDOW, uniqueId)
      .then(async doc => {
        if (doc.exists) {
          this.setInitialChats(uniqueId, doc.data());
          await this.setUserRefsAndValues(doc.data());
          await this.subscribeToWindow(uniqueId);
          onChangeAppLoading(false);
        } else {
          // doc.data() will be undefined in this case
          await this.createNewChatWindow(uniqueId);
          onChangeAppLoading(false);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
        onChangeAppLoading(false);
      });
  };

  componentDidMount() {
    this.setCurrentChatWindow();
  }

  /**
   * handleSend - new message
   */
  handleSend = () => {
    const { userChats, messageToSend } = this.state;
    if (messageToSend.length > 0) {
      const {
        storeData: { currentUserRef },
      } = this.props;
      const message = {
        message: messageToSend.trim(),
        type: 'text',
        createdAt: new Date(),
        from: currentUserRef,
        seen: [currentUserRef],
        delivered: [currentUserRef],
      };

      const payload = {
        chats: [...userChats, message],
      };
      setFirestoreDocumentData(
        FIRESTORE_COLLECTIONS.CHAT_WINDOW,
        this.currentChatWindow,
        payload,
        { merge: true },
      )
        .then(() => {})
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Error writing document: ', error);
        });
      this.setState({
        messageToSend: '',
      });
    }
  };

  getClassNames = isCurrentUser => {
    if (isCurrentUser) {
      return `messageSent messageSentLast`;
    }
    return `messageReceived messageReceivedLast`;
  };

  /**
   * renderSingleMessage
   * @param {object} message
   * @param {number} index
   * @returns message UI
   */
  renderSingleMessage = (message, index) => {
    const {
      storeData: { currentUserRef },
    } = this.props;
    const isCurrentUser = message.from.id === currentUserRef.id;
    const classNames = this.getClassNames(isCurrentUser, index);
    return (
      <p className={classNames} key={`${index}_${message}`}>
        {message.message}
      </p>
    );
  };

  /**
   * renderMessages
   * @returns each single message
   */
  renderMessages = () => {
    const { userChats } = this.state;
    if (userChats.length > 0) {
      return userChats.map(this.renderSingleMessage);
    }
    return <></>;
  };

  /**
   * getChatWindowName
   * @returns window name filtered by joined members
   */
  getChatWindowName = () => {
    const {
      storeData: { receiverUserValues },
    } = this.props;
    let chatWindowName = '';
    if (receiverUserValues) {
      if (receiverUserValues.length === 1) {
        chatWindowName = receiverUserValues[0].userName;
      } else {
        for (let index = 0; index < receiverUserValues.length; index++) {
          if (chatWindowName) {
            chatWindowName = `${chatWindowName},${
              receiverUserValues[index].userName
            }`;
          } else {
            chatWindowName = `${receiverUserValues[index].userName}`;
          }
        }
      }
    }
    return chatWindowName;
  };

  closeChatWindow = () => {
    const { updateAction } = this.props;
    resetChatWindow(updateAction);
  };

  componentWillUnmount() {
    const { updateAction } = this.props;
    if (
      this.unSubscribeToWindow !== null &&
      this.unSubscribeToWindow instanceof Function
    ) {
      this.unSubscribeToWindow();
      resetChatWindow(updateAction);
    }
  }

  render() {
    const { messageToSend } = this.state;
    return (
      <StyledChatRoom backgroundImage={chatImage}>
        <Card
          type="inner"
          title={
            <div className="chatRoomHeader">
              <p>{this.getChatWindowName()}</p>
              <CloseOutlined
                data-testid={TEST_IDS.CLOSE_ICON}
                onClick={() => this.closeChatWindow()}
              />
            </div>
          }
          actions={[
            <div className="sendMessageContainer">
              <Form className="messageInput">
                <Form.Item hasFeedback>
                  <Input
                    placeholder="Enter Your Message"
                    value={messageToSend}
                    data-testid={TEST_IDS.MESSAGE_INPUT}
                    onChange={e =>
                      this.setState({ messageToSend: e.target.value })
                    }
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  data-testid={TEST_IDS.SEND_MESSAGE}
                  onClick={() => this.handleSend()}
                  disabled={!messageToSend}
                >
                  Send
                </Button>
              </Form>
            </div>,
          ]}
        >
          <div className="cardContainer">
            <div className="chatRoomContainer">
              <div className="messageContainer">{this.renderMessages()}</div>
            </div>
          </div>
        </Card>
      </StyledChatRoom>
    );
  }
}

ChatRoom.propTypes = {
  onChangeAppLoading: PropTypes.func,
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

export default compose(withConnect)(ChatRoom);
