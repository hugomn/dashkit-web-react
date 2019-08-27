import { Box } from "grommet";
import * as React from "react";
import RadioCard from "./RadioCard/template";

interface IOptionProps {
  value: string;
  label: string;
  description: string;
}

interface IProps {
  disabled?: boolean;
  options: IOptionProps[];
  onSelect?: (value: string) => void;
  value?: string;
}

export const handleSelect = (onSelect: any) => (value: string) => {
  onSelect(value);
};

const RadioCardGroup: React.FC<IProps> = ({ disabled = false, options, onSelect, value }) => {
  return (
    <Box
      pad={{ horizontal: "medium" }}
      direction="row-responsive"
      align="stretch"
      data-testid="radioCardGroup">
      {options.map((option, i, { length }) => {
        return (
          <Box
            basis={`${100 / length}%`}
            key={option.value}
            margin={{ right: length - 1 !== i ? "medium" : "", top: "medium" }}>
            <RadioCard
              disabled={disabled}
              value={option.value}
              selected={value === option.value}
              onSelect={handleSelect(onSelect)}
              label={option.label}
              description={option.description}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default RadioCardGroup;
