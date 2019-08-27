import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, RadioButton, Heading } from "grommet";

storiesOf("Components/Radio Button", module).add("Radio Button", () => (
  <>
    <Box direction="row" align="center" basis="full">
      <Box direction="column" margin="medium">
        <Heading level="4">Unchecked</Heading>
        <RadioButton checked={false} label="Label" name="example" readOnly />
      </Box>
      <Box direction="column" margin="medium">
        <Heading level="4">Checked</Heading>
        <RadioButton checked={true} label="Label" name="example" readOnly />
      </Box>
      <Box direction="column" margin="medium">
        <Heading level="4">Disabled</Heading>
        <RadioButton checked={false} disabled label="Label" name="example" readOnly />
      </Box>
    </Box>
  </>
));
