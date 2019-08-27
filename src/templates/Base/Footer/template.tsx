import { Box } from "grommet";
import * as React from "react";
import styled from "styled-components";
import LanguageSelector from "../../../components/LanguageSelector";

const Footer: React.FunctionComponent<{}> = () => {
  return (
    <Wrapper flex="grow" background="white" pad={{ horizontal: "medium", vertical: "xsmall" }}>
      <div>
        <LanguageSelector />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
`;

export default Footer;
