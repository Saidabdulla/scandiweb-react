import { combineReducers } from "redux";
import currencyReducer from "./currency";

export default combineReducers({
  currency: currencyReducer,
});
