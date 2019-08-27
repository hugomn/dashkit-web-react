import React from "react";
import { storiesOf } from "@storybook/react";
import Moment from "react-moment";
import DataTable from "../../../../src/components/DataTable/template";
import { action } from "@storybook/addon-actions";

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

storiesOf("Components/DataTable", module).add("Default DataTable", () => {
  return (
    <DataTable
      columns={columns}
      data={data}
      sort={{ ascending: true, property: "id" }}
      onClick={action("User clicked")}
    />
  );
});
