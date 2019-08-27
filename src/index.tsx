// NOTE: Don't reorder these imports.
// Polyfill needs to be the first one to not break IE11.
import "react-app-polyfill/ie11";
import "core-js/features/array/find";
import "core-js";

import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { history, store } from "./store";
import IntlProvider from "./i18n/IntlProvider";
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
);
