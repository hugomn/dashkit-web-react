import { Box, Button, Drop, Text } from "grommet";
import styled from "styled-components";
import theme from "../../constants/theme";

export const StyledButton = styled(Button)`
  /* font-weight: bold; */
  &:hover {
    /* background-color: ${theme.global.colors["dark-3"]}; */
    /* color: white; */
  }
`;

export const StyledText = styled(Text)`
  transition: all 0.3s ease-in-out;
`;

export const IconWrapper = styled(Box)<{ inverted?: boolean }>`
  transition: all 0.3s ease-in-out;
  transform: ${({ inverted }) => (inverted ? "rotate(-180deg)" : "rotate(0deg)")};
`;

export const StyledDrop = styled(Drop)`
  margin-top: 24px;
  overflow: visible;
  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    margin-top: -16px;
    border-width: 6px;
    border-style: solid;
    border-color: ${theme.global.colors.white} ${theme.global.colors.white} transparent transparent;
    transform: rotate(-45deg);
    box-shadow: 1px -2px 2px 0px rgba(0, 0, 0, 0.1);
  }
`;

export const ContainerBox = styled(Box)`
  max-height: inherit;
  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 100%;
  }
  ${props => props.theme.menu.extend};
`;
