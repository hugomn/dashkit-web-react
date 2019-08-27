import { cleanup, fireEvent, render } from "@testing-library/react";
import * as React from "react";
import CurrencyInput from ".";

describe("CurrencyInput component", () => {
  let originalCurrency: string | undefined;

  beforeAll(() => {
    originalCurrency = process.env.REACT_APP_CURRENCY;
    process.env.REACT_APP_CURRENCY = "🍕";
  });
  afterAll(() => {
    process.env.REACT_APP_CURRENCY = originalCurrency;
  });

  afterEach(cleanup);

  it("Should match snapshot", () => {
    const { container } = render(<CurrencyInput value="12345" onChange={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it("should trigger onChange with correctly parsed number", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<CurrencyInput value=" " onChange={onChangeMock} />);
    fireEvent.change(getByTestId("currency-input"), { target: { value: "🍕1,00" } });
    expect(onChangeMock).toHaveBeenLastCalledWith("100");
    fireEvent.change(getByTestId("currency-input"), { target: { value: "🍕0,01" } });
    expect(onChangeMock).toHaveBeenLastCalledWith("1");
    fireEvent.change(getByTestId("currency-input"), { target: { value: "🍕17965,11" } });
    expect(onChangeMock).toHaveBeenLastCalledWith("1796511");
    fireEvent.change(getByTestId("currency-input"), { target: { value: "" } });
    expect(onChangeMock).toHaveBeenLastCalledWith("");
  });

  it("should correctly parse and render input number", () => {
    const { getByTestId, rerender } = render(<CurrencyInput value="100" onChange={jest.fn()} />);
    const myInputElem = getByTestId("currency-input") as HTMLInputElement;
    expect(myInputElem.value).toBe("🍕1,00");

    rerender(<CurrencyInput value="1796511" onChange={jest.fn()} />);
    expect(myInputElem.value).toBe("🍕17965,11");

    rerender(<CurrencyInput value="" onChange={jest.fn()} />);
    expect(myInputElem.value).toBe("");

    rerender(<CurrencyInput value="1" onChange={jest.fn()} />);
    expect(myInputElem.value).toBe("🍕0,01");
  });
});
