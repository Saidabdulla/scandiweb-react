import _ from "lodash";
import { CHANGE_CART } from "../actions/types";

const cart = {
  items: [],
};

export default function cartReducer(state = cart, action) {
  if (action.type === CHANGE_CART) {
    const itemIndex = state.items.findIndex((item) =>
      _.isEqual(item.item, action.payload.item)
    );

    if (itemIndex >= 0) {
      alert("You already have this product in your basket 😊!");
      return state;
    } else {
      return { ...state, items: [...state.items, action.payload] };
    }
  } else return state;
}
