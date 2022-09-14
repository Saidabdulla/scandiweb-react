let cart = {};

export default function cartReducer(object = cart, action) {
  return { ...action.payload };
}
