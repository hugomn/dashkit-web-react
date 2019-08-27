import { Box, RadioButton, Text } from "grommet";
import * as React from "react";
import styled from "styled-components";
import theme from "../../../constants/theme";

interface IProps {
  value: string;
  label: string;
  description: string;
  disabled: boolean;
  selected: boolean;
  onSelect: any;
}

const RadioCard: React.FC<IProps> = ({ selected, onSelect, disabled, ...props }) => {
  const { value, label, description } = props;
  return (
    <StyledBox
      data-testid="choice"
      disabled={disabled}
      pad="medium"
      selected={selected}
      onClick={() => !disabled && onSelect(value)}
      background="white"
      elevation="xsmall">
      <RadioButton
        data-testid={value}
        disabled={disabled}
        label={label}
        name="radio"
        value={value}
        checked={selected}
        onChange={(e: any) => onSelect(e.target.value)}
      />
      <Box pad={{ top: "small" }}>
        <Text>{description}</Text>
      </Box>
    </StyledBox>
  );
};

interface IStyledBoxProps {
  selected: boolean;
  disabled: boolean;
}

const StyledBox = styled(Box)`
  ${({ selected, disabled }: IStyledBoxProps) => `
  border-radius: 2px;
  height: 100%;
  label {
    font-weight: bold;
    opacity: 1;
  }
  transition: all 0.1s ease;

  ${
    selected
      ? `
    border: 1px solid ${theme.global.colors.brand};
    box-shadow: 0 0 2px ${theme.global.colors.brand};
    label {
      color: ${theme.global.colors.brand};
    }
  `
      : `
    border: 1px solid white;    
  `
  }

  ${disabled &&
    !selected &&
    `
    background-color: ${theme.global.colors["light-3"]};
    border: 1px solid ${theme.global.colors["light-3"]};
    color: ${theme.global.colors["dark-3"]};    
  `}

  ${!disabled &&
    `
    label {
      color: ${theme.global.colors.brand};
    }
    &:hover {
      cursor: pointer;
      label {
        color: ${theme.global.colors.brand};
      }
    }
    `}
  `}
`;

export default RadioCard;
