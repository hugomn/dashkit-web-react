import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Button, Heading } from "grommet";

storiesOf("Components/Button", module).add("Default button", () => (
  <>
    <Box direction="row" align="center">
      <Heading level="4">Solid Button</Heading>
      <Box align="center" pad="medium">
        <Button primary label="Default" onClick={() => {}} />
      </Box>
      <Box align="center" pad="medium">
        <Button primary disabled label="Disabled" onClick={() => {}} />
      </Box>
    </Box>

    <Box direction="row" align="center">
      <Heading level="4">Outline Button</Heading>
      <Box align="center" pad="medium">
        <Button label="Default" onClick={() => {}} />
      </Box>
      <Box align="center" pad="medium">
        <Button disabled label="Disabled" onClick={() => {}} />
      </Box>
    </Box>

    {/* TODO: https://github.com/grommet/grommet/issues/3031 */}
    <Box direction="row" align="center">
      <Heading level="4">Ghost Button</Heading>
      <Box align="center" pad="medium">
        <Button plain label="Default" onClick={() => {}} />
      </Box>
      <Box align="center" pad="medium">
        <Button plain disabled label="Disabled" onClick={() => {}} />
      </Box>
    </Box>
  </>
));
