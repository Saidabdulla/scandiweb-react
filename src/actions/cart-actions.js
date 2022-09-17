import { CHANGE_CART, EDIT_ACTIVE_ATTRIBUTE } from "./types";

export const addToCard = (object) => {
  return function (dispatch) {
    dispatch({
      type: CHANGE_CART,
      payload: object,
    });
  };
};

export const editActiveAttribute = (object) => {
  return function (dispatch) {
    dispatch({
      type: EDIT_ACTIVE_ATTRIBUTE,
      payload: object,
    });
  };
};
