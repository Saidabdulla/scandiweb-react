import { CHANGE_CURRENCY } from "../actions/types";

const initialState = {
  value: "$",
};

export default function curencyReducer(state = initialState, action) {
  if (action.type === CHANGE_CURRENCY) {
    return { ...state, value: action.payload };
  } else return state;
}
