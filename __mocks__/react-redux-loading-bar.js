import * as React from "react";

export const loadingBarReducer = (initialState = {}, action) => initialState;
export const loadingBarMiddleware = () => () => () => () => jest.fn();

const LoadingBar = () => {
  return <div />;
};

export default LoadingBar;
