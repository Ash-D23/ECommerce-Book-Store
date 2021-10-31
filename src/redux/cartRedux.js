import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      console.log(state.products)
      state.quantity += 1;
      state.products.push(action.payload);
    },
    removeproduct: (state, action) => {
      
      state.products = state.products.filter((item) => item._id !== action.payload.id);
      state.quantity -= 1
    },
    emptycart: (state, action) => {
      state.products= []
      state.quantity= 0
    },
    updateproduct: (state, action) => {
      state.products = state.products.map((item)=>{
        if (item._id === action.payload.id){
            let newitem = item
            newitem.quantity = action.payload.quantity
            return newitem
        }else{
          return item
        }
      })
    }
  },
});

export const { addProduct, removeproduct, updateproduct, emptycart } = cartSlice.actions;
export default cartSlice.reducer;