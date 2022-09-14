import { combineReducers } from "redux";
import currencyReducer from "./currency";
import cartReducer from "./cart";

export default combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
});
