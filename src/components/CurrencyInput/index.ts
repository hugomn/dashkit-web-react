import template from "./template";

export interface IProps {
  value: string;
  onChange: (newValue: string) => void;
}

const DECIMAL_POINT_SEPARATOR = ",";

export const centsToCurrencyString = (cents?: string) => {
  if (!cents) return cents;
  const paddedCents = cents.padStart(3, "0");
  const decimalPlaceIndex = paddedCents.length - 2;
  return `${process.env.REACT_APP_CURRENCY}${paddedCents.substr(
    0,
    decimalPlaceIndex
  )}${DECIMAL_POINT_SEPARATOR}${paddedCents.substr(decimalPlaceIndex)}`;
};

export const currencyStringToCents = (currencyString: string) => {
  const digits = currencyString.replace(/\D/g, "");
  const number = parseInt(digits, 10);
  return Number.isNaN(number) ? "" : number.toString();
};

export const handleOnChange = (handler: IProps["onChange"]) => (
  changeEvent: React.ChangeEvent<HTMLInputElement>
) => handler(currencyStringToCents(changeEvent.target.value));

export default template;
