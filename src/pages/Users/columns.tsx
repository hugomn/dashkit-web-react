import React from "react";
import CurrencyFormat from "react-currency-format";

export const Currency: React.FunctionComponent<{ value: number }> = props => {
  const { value } = props;
  if (Number.isNaN(value)) {
    return null;
  }
  return (
    <CurrencyFormat
      value={(Number(value) / 100).toFixed(2)}
      displayType="text"
      thousandSeparator
      renderText={(text: string) => <div>{text}</div>}
    />
  );
};

const columns = [
  {
    header: "Id",
    property: "id",
    sortProperty: "id",
    sortable: true
  },
  {
    header: "E-mail",
    property: "email",
    sortProperty: "email",
    sortable: true
  }
];

export default columns;
