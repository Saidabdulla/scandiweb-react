import { MAIN_OVERLAY } from "./types";

export const overlayToggle = (object) => {
  return function (dispatch) {
    dispatch({
      type: MAIN_OVERLAY,
      payload: object,
    });
  };
};
