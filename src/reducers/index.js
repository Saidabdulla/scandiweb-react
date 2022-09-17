import { combineReducers } from "redux";
import currencyReducer from "./currency";
import cartReducer from "./cart";
import overlayReducer from "./overlay";

export default combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
  overlay: overlayReducer,
});
