import { cleanup, fireEvent, render } from "@testing-library/react";
import { mount } from "enzyme";
import * as React from "react";
import Loading from "../Loading";
import DataTable from ".";

const columns = [
  {
    header: "Name",
    primary: true,
    property: "name",
    sortable: true
  },
  {
    header: "Email",
    property: "email",
    render: (data: string) => data
  }
];

const data = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Doe", email: "jane.doe@example.com" }
];

afterEach(cleanup);

describe("DataTable", () => {
  it("should render the table", () => {
    const wrapper = mount(
      <DataTable columns={columns} data={data} sort={{ ascending: true, property: "id" }} />
    );
    expect(wrapper.find(DataTable)).toHaveLength(1);
  });

  it("should render the table when there are data and isLoading data", () => {
    const wrapper = mount(<DataTable columns={columns} isLoading data={data} />);
    expect(wrapper.find(DataTable)).toBeTruthy();
  });

  it("should render the loading component when there are no data and isLoading data", () => {
    const wrapper = mount(<DataTable columns={columns} isLoading data={[]} />);
    expect(wrapper.find(Loading)).toBeTruthy();
  });

  it("component renders correctly when no onSort prop is passed", () => {
    const { getByText } = render(
      <DataTable
        columns={columns}
        data={data}
        sort={{ ascending: true, property: "id" }}
        onSort={undefined}
      />
    );
    const id = getByText(columns[0].header);
    fireEvent.click(id);
    expect(id).not.toBeNull();
  });

  it("onSort is called when header is clicked", () => {
    const onSort = jest.fn();
    const { getByText } = render(
      <DataTable
        columns={columns}
        data={data}
        sort={{ ascending: true, property: columns[0].property }}
        onSort={onSort}
      />
    );
    fireEvent.click(getByText(columns[0].header));
    expect(onSort).toHaveBeenCalledWith({ ascending: false, property: columns[0].property });
  });

  it("onSort is not called when a not sortable header is clicked", () => {
    const onSort = jest.fn();
    const { getByText } = render(
      <DataTable
        columns={columns}
        data={data}
        sort={{ ascending: true, property: "id" }}
        onSort={onSort}
      />
    );
    fireEvent.click(getByText(columns[1].header));
    expect(onSort).not.toHaveBeenCalled();
  });

  it("should render the placeholder correctly when there is no data and it's not loading", () => {
    const placeholder = <div>Empty</div>;
    const { getByText } = render(
      <DataTable columns={columns} data={[]} isLoading={false} placeholder={placeholder} />
    );
    expect(getByText("Empty")).toBeTruthy();
  });

  it("should handle onClick on a table element", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <DataTable columns={columns} data={data} isLoading={false} onClick={onClick} />
    );
    fireEvent.click(getByText(data[0][columns[0].property]));
    expect(onClick).toHaveBeenCalled();
  });

  it("should not call onClick when its not defined", () => {
    const { getByText } = render(
      <DataTable columns={columns} data={data} isLoading={false} onClick={undefined} />
    );
    fireEvent.click(getByText(data[0][columns[0].property]));
  });
});
