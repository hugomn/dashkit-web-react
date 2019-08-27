import { Box, Heading } from "grommet";
import * as React from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  buttons?: React.ReactNode;
}

const Card: React.FC<IProps> = ({ children, title, buttons }) => {
  return (
    <Box margin={{ top: "medium" }} background="light-1" elevation="xsmall" pad="medium">
      <Box direction="row" align="center" justify="between" margin={{ bottom: "small" }}>
        <StyledHeading level="5">{title}</StyledHeading>
        {buttons}
      </Box>
      <Box direction="row" align="center">
        {children}
      </Box>
    </Box>
  );
};

const StyledHeading = styled(Heading)`
  margin: 0;
`;

export default Card;
