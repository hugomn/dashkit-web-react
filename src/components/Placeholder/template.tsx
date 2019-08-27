/* eslint-disable react/no-danger */
import { Box, Image, Text } from "grommet";
import * as React from "react";

interface IProps {
  description: string;
  icon: string;
  title: string;
}

const Placeholder: React.FunctionComponent<IProps> = props => {
  const { description, icon, title } = props;
  return (
    <Box direction="column" justify="center" margin={{ top: "large" }} align="center" pad="large">
      <Image data-testid="icon" src={icon} />
      <Text
        data-testid="title"
        color="dark-3"
        weight="bold"
        size="large"
        margin={{ top: "medium", bottom: "xsmall" }}>
        {title}
      </Text>
      <Text data-testid="description" textAlign="center" color="dark-3" size="medium">
        <span dangerouslySetInnerHTML={{ __html: description }} />
      </Text>
    </Box>
  );
};

export default Placeholder;
