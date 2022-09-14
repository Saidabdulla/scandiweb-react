const initialState = {
  value: "$",
};

export default function curencyReducer(state = initialState, action) {
  const ls = localStorage.getItem("currency");

  if (ls === null && action.payload === undefined) {
    localStorage.setItem("currency", initialState.value);

    return { ...state };
  } else if (action.payload === undefined && ls !== null) {
    return { ...state, value: ls };
  } else return { ...state, value: action.payload };
}
