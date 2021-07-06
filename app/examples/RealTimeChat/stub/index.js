const personOne = {
  id: '1',
};
const personTwo = {
  id: '2',
};
export const chatWindowStub = {
  chats: [],
  createdAt: new Date(),
  createdBy: '',
  joined: [personOne, personTwo],
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
export const getFailureMockSearchResults = () => Promise.reject(new Error());

export const getSuccessMockChatList = () => {
  const docs = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    docs.push({
      data: () => chatWindowStub,
    });
  }

  return { docs };
};
export const getFailureMockChatList = () => Promise.reject(new Error());

export const getSuccessDataFromReference = () => {
  const data = {
    data: () => ({ email: `johndoe_1@gmail.com`, userName: `johndoe_1` }),
  };

  return Promise.resolve(data);
};
export const getFailureDataFromReference = () => Promise.reject(new Error());

export const TEST_IDS = {
  OPEN_CHAT_WINDOW: 'OPEN_CHAT_WINDOW',
};
