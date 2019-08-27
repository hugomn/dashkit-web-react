import { Box } from "grommet";
import React from "react";
import styled from "styled-components";
import { media } from "../../../constants/responsive";

const CardContainer: React.FunctionComponent = props => {
  return (
    <Wrapper flex="grow" direction="column">
      <Container
        elevation="xsmall"
        align="center"
        pad={{ horizontal: "large", vertical: "medium" }}
        background="#ffffff">
        {props.children}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  justify-content: stretch;
  align-items: stretch;
  ${media.md`
    margin: 7rem 0;
    align-items: center;
  `}
`;

const Container = styled(Box)`
  flex-grow: 1;
  ${media.md`
    flex-grow: 0
    min-width: 592px;
  `}
`;
export default CardContainer;
