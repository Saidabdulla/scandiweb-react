import {
  CHANGE_CART,
  EDIT_ACTIVE_ATTRIBUTE,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./types";

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

export const increaseQuantity = (object) => {
  return function (dispatch) {
    dispatch({
      type: INCREASE_QUANTITY,
      payload: object,
    });
  };
};

export const decreaseQuantity = (object) => {
  return function (dispatch) {
    dispatch({
      type: DECREASE_QUANTITY,
      payload: object,
    });
  };
};
