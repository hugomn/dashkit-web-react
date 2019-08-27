import { mount } from "enzyme";
import { Box } from "grommet";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { stateMock } from "../../tests/mocks/store";
import BaseTemplate from ".";

describe("Base template", () => {
  const mockFc = jest.fn(() => <div />);
  const store = configureStore()(stateMock);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <BaseTemplate component={mockFc} />
      </MemoryRouter>
    </Provider>
  );

  it("should render a grid area for header", () => {
    expect(wrapper.find(Box)).toBeTruthy();
  });

  it("should render the child component", () => {
    expect(mockFc.mock.calls.length).toBe(1);
  });
});
