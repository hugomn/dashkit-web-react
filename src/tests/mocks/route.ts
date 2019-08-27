import { createMemoryHistory } from "history";

const mock: any = jest.fn();

const routeComponentMock = {
  action: mock,
  history: createMemoryHistory(),
  location: {
    hash: mock,
    pathname: "/users",
    search: mock,
    state: mock
  },
  match: {
    isExact: false,
    params: {},
    path: "/users",
    url: ""
  },
  staticContext: undefined
};

export default routeComponentMock;
