const initialState = {
  value: "$",
};

export default function curencyReducer(state = initialState, action) {
  if (action.payload === undefined) {
    return {
      ...state,
    };
  } else
    return {
      ...state,
      value: action.payload,
    };
}
