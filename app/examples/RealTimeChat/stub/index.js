export const personOne = {
  id: 0,
};
const personTwo = {
  id: 1,
};
const personThree = {
  id: 2,
};
export const chatWindowStub = {
  chats: [
    {
      message: 'Hi',
      type: 'text',
      createdAt: {
        toDate: () => {},
      },
      from: personOne,
      seen: [personOne.id],
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
      id: `${i}`,
      data: () => ({ email: `johndoe_${i}@gmail.com`, userName: 'johnDoe' }),
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
export const getCurrentUserMock = elseCase => {
  const docs = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    docs.push({
      id: '1',
      data: () => ({ id: '1' }),
    });
  }
  if (elseCase) {
    return Promise.resolve({ docs: [] });
  }
  return Promise.resolve({ docs });
};
export const getFailureMockChatList = () => {};

export const getSuccessDataFromReferenceSameEmail = () => {
  const data = {
    data: () => ({
      email: `johndoe_0@gmail.com`,
      userName: `johndoe_0`,
      lastSeen: new Date(),
    }),
  };

  return Promise.resolve(data);
};
export const getSuccessDataFromReferenceDiffEmail = () => {
  const data = {
    data: () => ({
      email: `johndoe_1@gmail.com`,
      userName: `johndoe_1`,
      lastSeen: new Date(),
    }),
  };

  return Promise.resolve(data);
};

export const getSuccessChatWindowData = (elseCase, chatParticipants) => {
  const data = [];

  data.push({
    data: () =>
      chatParticipants === 'group' ? groupChatWindowStub : chatWindowStub,
    id: '0',
  });
  if (elseCase) {
    return Promise.resolve({ docs: [] });
  }
  return Promise.resolve({ docs: data });
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
  CREATE_CHAT: 'CREATE_CHAT',
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
