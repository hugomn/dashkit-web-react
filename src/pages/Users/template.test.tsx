import { render } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import { TableBody, TableRow } from "grommet";
import i18n from "i18next";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DataTable from "../../components/DataTable";
import Loading from "../../components/Loading";
import { IApplicationState } from "../../store";
import actions from "../../store/users/actions";
import { paginationMock, stateMock } from "../../tests/mocks/store";
import { usersMock } from "../../tests/mocks/user";
import { Currency } from "./columns";
import Users from "./template";
import { mapDispatchToProps, mapStateToProps } from ".";

describe("Users page", () => {
  const store = configureStore<IApplicationState>()(stateMock);
  const mockFetchAllUsers = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <Users
        fetchAllUsers={mockFetchAllUsers}
        isLoading={false}
        users={usersMock}
        i18n={i18n}
        t={jest.fn()}
        tReady
      />
    </Provider>
  );
  it("Should render the main datatable", () => {
    expect(wrapper.find(DataTable).length).toBe(1);
  });

  it("Datatable should render the correct amount of users", () => {
    expect(wrapper.find(TableBody).find(TableRow).length).toBe(usersMock.length);
  });

  it("Should not render rows when theres no users", () => {
    const emptyWrapper = mount(
      <Provider store={store}>
        <Users
          fetchAllUsers={jest.fn()}
          isLoading={false}
          users={[]}
          i18n={i18n}
          t={jest.fn()}
          tReady
        />
      </Provider>
    );
    expect(emptyWrapper.find(TableBody).find(TableRow).length).toBe(0);
  });

  it("Should not render datatable when its loading and theres no users", () => {
    const emptyWrapper = mount(
      <Provider store={store}>
        <Users fetchAllUsers={jest.fn()} isLoading users={[]} i18n={i18n} t={jest.fn()} tReady />
      </Provider>
    );
    expect(emptyWrapper.find(TableBody).length).toBe(0);
  });

  it("Should not render datatable when search returned no results", () => {
    const emptyWrapper = mount(
      <Provider store={store}>
        <Users
          fetchAllUsers={jest.fn()}
          isLoading={false}
          users={[]}
          i18n={i18n}
          t={jest.fn()}
          tReady
        />
      </Provider>
    );
    expect(emptyWrapper.find(TableBody).length).toBe(0);
  });

  it("Should render Loading placeholder when users were not initialized yet", () => {
    const emptyWrapper = mount(
      <Provider store={store}>
        <Users
          fetchAllUsers={jest.fn()}
          isLoading={false}
          users={undefined}
          i18n={i18n}
          t={jest.fn()}
          tReady
        />
      </Provider>
    );
    expect(emptyWrapper.find(Loading)).toBeTruthy();
  });

  it("Should render a Currency formatted component", () => {
    const { getByText } = render(<Currency value={100} />);
    expect(getByText("1.00")).toBeTruthy();
  });

  it("Should render nothing when score is NaN", () => {
    const currencyWrapper = shallow(<Currency value={NaN} />);
    expect(currencyWrapper.instance()).toBe(null);
  });
});

describe("Users page connector", () => {
  it("Should connect to the right state props", () => {
    expect(mapStateToProps(stateMock).users).toEqual(usersMock);
  });

  it("FetchAllUsers prop should dispatch the correct action", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchAllUsers(paginationMock);
    expect(dispatch.mock.calls[0][0]).toEqual(actions.fetchAllRequested(paginationMock));
  });
});
