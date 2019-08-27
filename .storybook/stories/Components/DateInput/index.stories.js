import React from "react";
import { storiesOf } from "@storybook/react";
import DateInput from "../../../../src/components/DateInput/template";

storiesOf("Components/DateInput", module).add("Default input", () => (
  <DateInput name={"date"} disabled={false} value={new Date()} onSelect={() => {}} />
));
