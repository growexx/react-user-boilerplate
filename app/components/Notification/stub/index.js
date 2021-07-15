import {
  chatWindowStub,
  groupChatWindowStub,
} from 'examples/RealTimeChat/stub';
export const getSuccessMockUserId = dataLength => {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    data.push({
      email: `johndoe_${i}@gmail.com`,
      id: i,
    });
  }
  const returnData = {
    docs: data,
  };
  if (dataLength === 0) {
    return Promise.resolve({
      docs: [],
    });
  }
  return Promise.resolve(returnData);
};

export const getSuccessWindows = dataLength => {
  const docs = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    docs.push({
      data: () => (i % 2 === 0 ? chatWindowStub : groupChatWindowStub),
    });
  }
  if (dataLength === 0) {
    return {
      empty: true,
    };
  }

  return docs;
};
