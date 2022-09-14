export const addItem = (object) => {
  return function (dispatch) {
    dispatch({
      payload: object,
    });
  };
};
