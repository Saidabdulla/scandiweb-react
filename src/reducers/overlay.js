import { MAIN_OVERLAY } from "../actions/types";

const initialState = {
  value: false,
};

export default function overlayReducer(state = initialState, action) {
  if (action.type === MAIN_OVERLAY) {
    return { ...state, value: action.payload };
  } else return state;
}
