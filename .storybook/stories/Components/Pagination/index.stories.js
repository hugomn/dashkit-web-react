import React from "react";
import { storiesOf } from "@storybook/react";
import Pagination from "../../../../src/components/Pagination";
import { action } from "@storybook/addon-actions";

storiesOf("Components/Pagination", module).add("Default Pagination", () => {
  return <Pagination page={0} totalPages={200} onPageChange={action("pageChange")} />;
});
