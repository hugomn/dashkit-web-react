const axios = jest.genMockFromModule("axios");

const axiosMock = {
  defaults: {
    headers: {
      common: {
        Authorization: undefined
      }
    }
  },
  interceptors: {
    response: {
      use: jest.fn()
    },
    request: {
      use: jest.fn()
    }
  },
  get: jest.fn(() => {
    return Promise.resolve({ data: {} });
  }),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  request: jest.fn(() => Promise.resolve({ data: {} }))
};

axios.create = jest.fn(() => ({ ...axios, ...axiosMock }));

export default axios;
