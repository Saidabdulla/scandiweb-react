import { CHANGE_CART } from "./types";

export const addToCard = (object) => {
  console.log("Cart Actions: ", object);

  return function (dispatch) {
    dispatch({
      type: CHANGE_CART,
      payload: object,
    });
  };
};
