import { CHANGE_CART } from "./types";

export const addToCard = (object) => {
  return function (dispatch) {
    dispatch({
      type: CHANGE_CART,
      payload: object,
    });
  };
};
