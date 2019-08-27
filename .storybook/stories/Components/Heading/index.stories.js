import React from "react";
import { storiesOf } from "@storybook/react";
import { Heading, Grid } from "grommet";

const H = ({ level, size }) => (
  <Heading level={level} size={size}>
    {`Heading ${level} ${size}`}
  </Heading>
);

const Set = ({ size }) => (
  <div>
    {[1, 2, 3, 4, 5, 6].map(level => (
      <H key={level} level={level} size={size} />
    ))}
  </div>
);

const All = () => (
  <Grid columns="large" gap="medium">
    <Set size="medium" />
    <Set size="small" />
    <Set size="large" />
    <Set size="xlarge" />
  </Grid>
);

storiesOf("Components/Heading", module).add("Default headings", () => <All />);
