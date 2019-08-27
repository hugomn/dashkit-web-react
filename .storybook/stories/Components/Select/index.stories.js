import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Select, Heading } from "grommet";

const SimpleSelect = () => {
  const [value, setValue] = React.useState("");
  return (
    <Box>
      <Select
        options={["one", "two", "three"]}
        value={value}
        placeholder="Please select"
        onChange={({ option }) => setValue(option)}
      />
    </Box>
  );
};

storiesOf("Components/Select", module).add("Select", () => (
  <>
    <Box direction="row" align="center" basis="full">
      <Box direction="column" margin="medium">
        <Heading level="4">Select Field</Heading>
        <Box pad={{ top: "medium", bottom: "medium" }}>
          <SimpleSelect />
        </Box>
      </Box>
    </Box>
  </>
));
