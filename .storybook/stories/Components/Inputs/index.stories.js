import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Heading, Text, TextInput, TextArea } from "grommet";

storiesOf("Components/Inputs", module).add("TextInput", () => (
  <>
    <Box direction="row" align="center" basis="full">
      <Box direction="column" margin="medium">
        <Heading level="4">Text Input</Heading>
        <Text>Text inputs are used for one line text input fields.</Text>
        <Box pad={{ top: "medium", bottom: "medium" }}>
          <TextInput placeholder="Example" />
        </Box>
      </Box>

      <Box direction="column" margin="medium">
        <Heading level="4">Text Input Disabled</Heading>
        <Text>Text inputs are used for one line text input fields.</Text>
        <Box pad={{ top: "medium", bottom: "medium" }}>
          <TextInput disabled placeholder="Example" value="A disabled input" />
        </Box>
      </Box>
    </Box>
  </>
));

storiesOf("Components/Inputs", module).add("TextArea", () => (
  <>
    <Box direction="row" align="center" basis="full">
      <Box direction="column" margin="medium">
        <Heading level="4">Text Area</Heading>
        <Text>Text areas are used for longer free text areas.</Text>
        <Box pad={{ top: "medium", bottom: "medium" }}>
          <TextArea placeholder="Example" />
        </Box>
      </Box>

      <Box direction="column" margin="medium">
        <Heading level="4">Text Area Disabled</Heading>
        <Text>Text areas are used for longer free text areas.</Text>
        <Box pad={{ top: "medium", bottom: "medium" }}>
          <TextArea disabled placeholder="Example" value="A disabled text area" />
        </Box>
      </Box>
    </Box>
  </>
));
