import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Text, Heading } from "grommet";

storiesOf("Examples/Theme", module).add("Colors", () => (
  <Box margin={{ left: "large" }}>
    <Box direction="column">
      <Heading level="2">Theme Colors</Heading>
      <Text>
        The following are the color themes that can be used throughout application and on the right
        side is the reference the name as the color usage.
      </Text>
      <Box direction="row" basis="full">
        <Box direction="column" pad={{ right: "large" }}>
          <Heading level="4">Brand Color</Heading>
          <Box align="center" direction="row">
            <Box pad="small" margin={{ right: "small" }} background="brand" />
            <Text>brand</Text>
          </Box>
        </Box>

        <Box direction="column" pad={{ right: "large" }}>
          <Heading level="4">Clear Teal</Heading>
          <Box align="center" direction="row">
            <Box pad="small" margin={{ right: "small" }} background="accent-1" />
            <Text>accent-1</Text>
          </Box>
        </Box>

        <Box direction="column" pad={{ right: "large" }}>
          <Heading level="4">Soft Orange</Heading>
          <Box align="center" direction="row">
            <Box pad="small" margin={{ right: "small" }} background="accent-2" />
            <Text>accent-2</Text>
          </Box>
        </Box>

        <Box direction="column" pad={{ right: "large" }}>
          <Heading level="4">Grey</Heading>
          <Box direction="column">
            <Box align="center" direction="row" margin={{ bottom: "small" }}>
              <Box pad="small" margin={{ right: "small" }} background="dark-1" />
              <Text>dark-1</Text>
            </Box>
            <Box align="center" direction="row" margin={{ bottom: "small" }}>
              <Box pad="small" margin={{ right: "small" }} background="dark-2" />
              <Text>dark-2</Text>
            </Box>
            <Box align="center" direction="row" margin={{ bottom: "small" }}>
              <Box pad="small" margin={{ right: "small" }} background="dark-3" />
              <Text>dark-3</Text>
            </Box>
            <Box align="center" direction="row" margin={{ bottom: "small" }}>
              <Box pad="small" margin={{ right: "small" }} background="dark-4" />
              <Text>dark-4</Text>
            </Box>
            <Box align="center" direction="row" margin={{ bottom: "small" }}>
              <Box pad="small" margin={{ right: "small" }} background="light-4" />
              <Text>light-4</Text>
            </Box>
            <Box align="center" direction="row" margin={{ bottom: "small" }}>
              <Box pad="small" margin={{ right: "small" }} background="light-3" />
              <Text>light-3</Text>
            </Box>
            <Box align="center" direction="row" margin={{ bottom: "small" }}>
              <Box pad="small" margin={{ right: "small" }} background="light-2" />
              <Text>light-2</Text>
            </Box>
            <Box align="center" direction="row">
              <Box pad="small" margin={{ right: "small" }} background="light-1" border="all" />
              <Text>light-1</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    <Box direction="column">
      <Heading level="2">Notifications</Heading>
      <Box direction="row">
        <Box direction="column" pad={{ right: "large" }}>
          <Heading level="4">Error</Heading>
          <Box align="center" direction="row">
            <Box pad="small" margin={{ right: "small" }} background="status-error" />
            <Text>status-error</Text>
          </Box>
        </Box>
        <Box direction="column" pad={{ right: "large" }}>
          <Heading level="4">Warning</Heading>
          <Box align="center" direction="row">
            <Box pad="small" margin={{ right: "small" }} background="status-warning" />
            <Text>status-warning</Text>
          </Box>
        </Box>
        <Box direction="column" pad={{ right: "large" }}>
          <Heading level="4">Confirmation</Heading>
          <Box align="center" direction="row">
            <Box pad="small" margin={{ right: "small" }} background="status-confirmation" />
            <Text>status-confirmation</Text>
          </Box>
        </Box>
        <Box direction="column" pad={{ right: "large" }}>
          <Heading level="4">Information</Heading>
          <Box align="center" direction="row">
            <Box pad="small" margin={{ right: "small" }} background="status-information" />
            <Text>status-information</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
));
