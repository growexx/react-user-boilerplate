import ProfileImageMock from 'images/Growexx-Triangle.svg';
export const getMockChatList = () => {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    data.push({
      profilePic: ProfileImageMock,
      userName: `John_Doe_${i}`,
      latestMessage: 'How was your day ?',
    });
  }

  return Promise.resolve({
    data,
    status: 1,
  });
};
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
