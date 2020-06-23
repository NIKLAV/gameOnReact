import { createStore, combineReducers } from "redux";
import stepsNumbersReducer from "./steps_numbers_reducer";
import disableReducer from "./disable_reducer";

let reducers = combineReducers({
  stepsNumbersReducer,
  disableReducer,
});

export const store = createStore(
  reducers /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
