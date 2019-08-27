import React from "react";
import { TextInput } from "grommet";
import { IProps, centsToCurrencyString, handleOnChange } from ".";

const CurrencyInput = ({ value, onChange }: IProps) => (
  <TextInput
    value={centsToCurrencyString(value)}
    onChange={handleOnChange(onChange)}
    placeholder={`${process.env.REACT_APP_CURRENCY}0,00`}
    data-testid="currency-input"
  />
);

export default React.memo(CurrencyInput);
