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
