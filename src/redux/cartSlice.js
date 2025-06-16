import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("Dispatch received:", action.payload);

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 });
        console.log("Item added:", state.items);
      } else {
        console.log("Item already in cart");
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    ClearCart: (state)=>{
      state.items = []
    }
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, ClearCart } =
  cartSlice.actions;
  
export default cartSlice.reducer;

export const selectCartTotal = (state)=>
  state.cart.items.reduce(
    (total, item)=> total + item.price * item.quantity,
    0
  );
