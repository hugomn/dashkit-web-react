import React from "react";
import { storiesOf } from "@storybook/react";
import { Text, Box, Button, Heading } from "grommet";

import Modal from "../../../../src/components/Modal/template";

storiesOf("Components/Modal", module).add("Modal", () => {
  const onClose = () => {
    console.log("Close modal");
  };
  return (
    <Modal title="Example Modal" onClose={onClose}>
      <Box direction="row" width="medium" justify="around" margin={{ top: "large" }}>
        <Button primary label="Default" />
        <Button label="Default" />
      </Box>
    </Modal>
  );
});
