import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import createStoreInstance from "./store";
import Routes from "./routes";

// 客户端获取预获取数据__PRELOAD_STATE_
const store = createStoreInstance(window?.__PRELOAD_STATE__);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
