import React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "grommet";
import styled from "styled-components";
import { media } from "../../../../src/constants/responsive";
import HeaderMenu from "../../../../src/components/HeaderMenu";

storiesOf("Examples/HeaderMenu", module).add("Default HeaderMenu", () => {
  return (
    <Box background="dark-2">
      <Wrapper pad={{ horizontal: "large", vertical: "small" }} direction="row">
        <HeaderMenu
          label={"Users"}
          items={[
            { label: "List users", onClick: () => {} },
            { label: "Archived users", onClick: () => {} }
          ]}
        />

        <HeaderMenu
          label={"Admin"}
          items={[
            { label: "Settings", onClick: () => {} },
            { label: "Users", onClick: () => {} }
          ]}
        />
      </Wrapper>
    </Box>
  );
});

const Wrapper = styled(Box)`
  ${media.md`
    min-width: 500px;
  `};
`;
