export const personOne = {
  id: '1',
};
const personTwo = {
  id: '2',
};
const personThree = {
  id: '2',
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
    data: () => ({ email: `johndoe_0@gmail.com`, userName: `johndoe_1` }),
  };

  return Promise.resolve(data);
};
export const getSuccessDataFromReferenceDiffEmail = () => {
  const data = {
    data: () => ({ email: `johndoe_1@gmail.com`, userName: `johndoe_1` }),
  };

  return Promise.resolve(data);
};

export const getSuccessChatWindowData = chatWindowType => {
  const response = {
    exists: chatWindowType === 'old',
    data: () => chatWindowStub,
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
};
