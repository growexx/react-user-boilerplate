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

export const TEST_IDS = {
  OPEN_CHAT_WINDOW: 'OPEN_CHAT_WINDOW',
};
