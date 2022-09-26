import _ from "lodash";
import { toast } from "react-toastify";
import {
  CHANGE_CART,
  DECREASE_QUANTITY,
  EDIT_ACTIVE_ATTRIBUTE,
  INCREASE_QUANTITY,
} from "../actions/types";

const cart = {
  items: [],
};

export default function cartReducer(state = cart, action) {
  if (action.type === CHANGE_CART) {
    const itemIndex = state.items.findIndex((item) =>
      _.isEqual(item.item, action.payload.item)
    );

    if (itemIndex >= 0) {
      state.items[itemIndex].quantity += 1;
      toast.info("Product added!");
      return state;
    } else {
      toast.info("Product added!");
      return { ...state, items: [...state.items, action.payload] };
    }
  } else if (action.type === EDIT_ACTIVE_ATTRIBUTE) {
    const itemIndex = state.items.findIndex((item) =>
      _.isEqual(item, action.payload[0])
    );

    state.items[itemIndex] = action.payload[1];

    return { ...state };
  } else if (action.type === INCREASE_QUANTITY) {
    const itemIndex = state.items.findIndex((item) =>
      _.isEqual(item, action.payload)
    );

    state.items[itemIndex].quantity += 1;

    return { ...state };
  } else if (action.type === DECREASE_QUANTITY) {
    const itemIndex = state.items.findIndex((item) =>
      _.isEqual(item, action.payload)
    );

    state.items[itemIndex].quantity -= 1;

    if (state.items[itemIndex].quantity <= 0) {
      state.items.splice(itemIndex, 1);
      toast.error("Product deleted!");
    }

    return { ...state };
  } else return state;
}
