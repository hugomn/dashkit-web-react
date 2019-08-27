import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, CheckBox, Heading } from "grommet";

storiesOf("Components/Checkbox", module).add("Default Checkbox", () => (
  <>
    <Box direction="row" align="center" basis="full">
      <Box direction="column" margin="medium">
        <Heading level="4">Unchecked</Heading>
        <CheckBox checked={false} label="Label" readOnly />
      </Box>
      <Box direction="column" margin="medium">
        <Heading level="4">Checked</Heading>
        <CheckBox checked={true} label="Label" readOnly />
      </Box>
      <Box direction="column" margin="medium">
        <Heading level="4">Disabled</Heading>
        <CheckBox checked={false} label="Label" disabled readOnly />
      </Box>
    </Box>
  </>
));
