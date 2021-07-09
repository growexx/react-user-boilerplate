export const personOne = {
  id: '1',
};
const personTwo = {
  id: '2',
};
const personThree = {
  id: '3',
};
export const chatWindowStub = {
  chats: [
    {
      message: 'Hi',
      type: 'text',
      createdAt: new Date(),
      from: personOne,
      seen: [personOne],
      delivered: [personTwo],
    },
  ],
  createdAt: new Date(),
  createdBy: '',
  joined: [personOne, personTwo],
};
export const groupChatWindowStub = {
  chats: [],
  createdAt: new Date(),
  createdBy: '',
  joined: [personOne, personTwo, personThree],
};
export const getSuccessMockSearchResults = () => {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    data.push({
      data: () => ({ email: `johndoe_${i}@gmail.com` }),
    });
  }

  return Promise.resolve(data);
};

export const getSuccessMockChatList = () => {
  const docs = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    docs.push({
      data: () => (i % 2 === 0 ? chatWindowStub : groupChatWindowStub),
    });
  }

  return { docs };
};
export const getFailureMockChatList = () => {};

export const getSuccessDataFromReferenceSameEmail = () => {
  const data = {
    data: () => ({ email: `johndoe_11@gmail.com`, userName: `johndoe_11` }),
  };

  return Promise.resolve(data);
};
export const getSuccessDataFromReferenceDiffEmail = () => {
  const data = {
    data: () => ({ email: `johndoe_1@gmail.com`, userName: `johndoe_1` }),
  };

  return Promise.resolve(data);
};

export const getSuccessChatWindowData = (chatWindowType, chatParticipants) => {
  const response = {
    exists: chatWindowType === 'old',
    data: () =>
      chatParticipants === 'group' ? groupChatWindowStub : chatWindowStub,
  };
  return Promise.resolve(response);
};

export const getSuccessChatsSubscription = () => {
  const returnData = {
    chats: chatWindowStub.chats,
  };
  return {
    data: () => returnData,
  };
};
export const getFailureResponse = () => Promise.reject(new Error());

export const TEST_IDS = {
  OPEN_CHAT_WINDOW: 'OPEN_CHAT_WINDOW',
  SEND_MESSAGE: 'SEND_MESSAGE',
  CLOSE_ICON: 'CLOSE_ICON',
  MESSAGE_INPUT: 'MESSAGE_INPUT',
};

export const skeletonLoaderStub = () => {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < 7; index++) {
    data.push({
      name: 'John',
      id: index,
      chats: chatWindowStub.chats,
    });
  }
  return data;
};
