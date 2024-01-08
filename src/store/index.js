import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

export default function createStoreInstance(preloadedState = {}) {
  console.log(thunk)
  return createStore(reducer, preloadedState, applyMiddleware(thunk));
}
