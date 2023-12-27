import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  cart: [],
  error: null,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const isItemAlreadyExist = state.cart?.findIndex(
        (res: any) => res.id === payload.id
      );

      if (isItemAlreadyExist >= 0) {
        // alert("nothing  added");
        modifiedQuantity(state, isItemAlreadyExist, payload, "added");
      } else {
        state.cart.push(payload);
      }
    },
    updateQuantity: (state, { payload }) => {
      const isItemAlreadyExist = state.cart?.findIndex(
        (res: any) => res.id === payload.id
      );

      if (isItemAlreadyExist >= 0) {
        modifiedQuantity(state, isItemAlreadyExist, payload, "updated");
      }
    },
    removeProductFromCart: (state, { payload }) => {
      const updatedCart = state.cart.filter(
        (item: any) => item.id !== payload.id
      );
      state.cart = updatedCart;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});
interface Payload {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { href: string; rate: number; count: number };
  quantity: number;
}
function modifiedQuantity(
  state: any,
  item: number,
  payload: Payload,
  mode: string
) {
  if (mode === "added") {
    state.cart[item].quantity += 1;
  }
  if (mode === "updated") {
    state.cart[item].quantity = payload.quantity;
  }

  state.cart[item].updatedPrice = payload.price;
  state.cart[item].updatedPrice =
    state.cart[item].price * state.cart[item].quantity;
}
export const { addToCart, updateQuantity, removeProductFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
