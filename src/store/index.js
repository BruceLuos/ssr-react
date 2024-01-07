import { createStore, applyMiddleware } from "redux";
import thunk from "react-redux";
import reducer from "./reducers";

// export default function createStoreInstance(preloadedState = {}) {
//   console.log(thunk)
//   return createStore(reducer, preloadedState, applyMiddleware(thunk));
// }

const store = createStore(reducer);

export default store;
