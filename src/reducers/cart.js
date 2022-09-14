const cart = {};

export default function cartReducer(state = cart, action) {
  console.log("Reducer: ", action.payload);

  if (action.payload) {
    return { ...state, items: [...state.items, action.payload] };
  } else return state;
}

// const ls = JSON.parse(localStorage.getItem("cart"));

// if (ls === null && action.payload === undefined) {
//   localStorage.setItem("cart", JSON.stringify(cart));

//   return [...state];
// } else if (action.payload === undefined && ls !== null) {
//   return [...state, ...ls];
// } else {
//   console.log([...state, ...action.payload]);
//   return [...state, ...action.payload];
// }
