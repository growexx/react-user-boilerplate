/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Avatar, Button } from 'antd';
import {
  getFireStoreCollectionReference,
  getDataFromReference,
} from 'utils/firebase';
import { getUserData } from 'utils/Helper';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import { loadApp } from 'containers/App/actions';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import { StyledChatRoom } from 'examples/RealTimeChat/ChatRoom/StyledChatRoom';
import { updateField } from 'examples/RealTimeChat/actions';
import {
  getFireStoreDocumentReference,
  setFirestoreDocumentData,
} from '../../../utils/firebase';

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

  subscribeToWindow = chatWindow => {
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
    const returnData = await getDataFromReference(person)
      .then(data => data.data())
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
      });
    return returnData;
  };

  /**
   * setUserRefsAndValues
   * @param {object} data
   */
  setUserRefsAndValues = async data => {
    const { joined } = data;
    const {
      storeData: { receiverUserRefs, receiverUserValues },
      updateAction,
    } = this.props;

    for (let index = 0; index < joined.length; index++) {
      const userValue = await this.fetchPersonData(joined[index]);
      if (userValue.email === getUserData().email) {
        updateAction('currentUserValue', userValue);
      } else {
        const newRefs = receiverUserRefs.concat(joined[index]);
        const newValues = receiverUserValues.concat(userValue);
        updateAction('receiverUserRefs', newRefs);
        updateAction('receiverUserValues', newValues);
      }
    }
  };

  /**
   * setCurrentChatWindow - initialize current chat window
   */
  setCurrentChatWindow = () => {
    const {
      storeData: { selectedChatWindow },
      onChangeAppLoading,
    } = this.props;

    onChangeAppLoading(true);

    getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.CHAT_WINDOW)
      .where('joined', 'array-contains-any', selectedChatWindow)
      .get()
      .then(async querySnapshot => {
        const { docs } = querySnapshot;
        if (docs) {
          if (docs.length === 0) {
            // create new chat window
            // eslint-disable-next-line no-console
            console.log('length 0', docs.length);
          } else if (docs.length === 1) {
            [this.currentChatWindow] = docs;
            this.setState({
              userChats: docs[0].data().chats,
            });
            await this.setUserRefsAndValues(docs[0].data());
            this.subscribeToWindow(docs[0].id);
          } else {
            // get the exact window
            // eslint-disable-next-line no-console
            console.log('length more than 1', docs.length);
          }
        }
        onChangeAppLoading(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
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
        this.currentChatWindow.id,
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
    return (
      <p
        className={
          message.from.id === currentUserRef.id
            ? `messageSent`
            : `messageReceived`
        }
        key={`${index}_${message}`}
      >
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
    return userChats.map(this.renderSingleMessage);
  };

  componentWillUnmount() {
    this.unSubscribeToWindow();
  }

  render() {
    const { messageToSend } = this.state;
    return (
      <StyledChatRoom>
        <div className="chatRoomContainer">
          <div className="chatRoomHeader">
            <p>Name of User</p>
            <Avatar icon={<UserOutlined />} />
          </div>
          <div className="messageContainer">{this.renderMessages()}</div>
          <Form className="messageInput">
            <Form.Item hasFeedback>
              <Input
                placeholder="Enter Your Message"
                value={messageToSend}
                onChange={e => this.setState({ messageToSend: e.target.value })}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              onClick={() => this.handleSend()}
            >
              Send
            </Button>
          </Form>
        </div>
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
