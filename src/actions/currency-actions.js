import { CHANGE_CURRENCY } from "../actions/types";

export const changeCurrency = (symbol) => {
  return function (dispatch) {
    dispatch({
      type: CHANGE_CURRENCY,
      payload: symbol,
    });
  };
};
