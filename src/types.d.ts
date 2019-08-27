// tslint:disable interface-name
interface Window {
  CSS: any;
  initialReduxState: any;
  store: any;
}

declare module "react-currency-format" {
  let currencyFormat: any;
  export = currencyFormat;
}

declare module "*.svg";
