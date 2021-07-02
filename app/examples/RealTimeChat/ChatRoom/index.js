/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Avatar } from 'antd';
import {
  getFireStoreCollectionReference,
  getFireStoreDocumentReference,
  getDataFromReference,
} from 'utils/firebase';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import { loadApp } from 'containers/App/actions';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import { StyledChatRoom } from 'examples/RealTimeChat/ChatRoom/StyledChatRoom';
import { updateField } from 'examples/RealTimeChat/actions';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      currentWindow: {},
      userChats: [],
    };
  }

  componentDidMount() {
    const {
      storeData: { selectedChatWindow },
      onChangeAppLoading,
    } = this.props;
    onChangeAppLoading(true);
    getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.CHAT_WINDOW)
      .where('joined', 'array-contains-any', selectedChatWindow)
      .get()
      .then(async querySnapshot => {
        const result = [];
        const { docs } = querySnapshot;
        if (docs) {
          if (docs.length === 0) {
            // create new chat window
            // eslint-disable-next-line no-console
            console.log('length 0', docs.length);
          } else if (docs.length === 1) {
            this.setState({
              currentWindow: docs[0].data(),
              userChats: docs[0].data().chats,
            });
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
  }

  handleFormSubmit = () => {};

  renderSingleMessage = (message, index) => {
    const {
      storeData: { currentUserRef },
    } = this.props;
    return (
      <p
        className={
          message.from === currentUserRef ? `messageSent` : `messageSent`
        }
        key={`${index}_${message}`}
      >
        {message.message}
      </p>
    );
  };

  renderMessages = () => {
    const { userChats } = this.state;
    return userChats.map(this.renderSingleMessage);
  };

  render() {
    return (
      <StyledChatRoom>
        <div className="chatRoomHeader">
          <p>Name of User</p>
          <Avatar icon={<UserOutlined />} />
        </div>
        <div className="messageContainer">{this.renderMessages()}</div>
        <div className="messageInput">
          <Form.Item hasFeedback>
            <Input placeholder="Enter Your Message" />
          </Form.Item>
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
