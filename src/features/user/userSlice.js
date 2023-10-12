import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

// export const getCategories = createAsyncThunk("categories/getCategories", async (_, thunkAPI) => {
//   try {
//     const res = await axios(`${BASE_URL}/categories`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return thunkAPI.rejectWithValue(error);
//   }
// });

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: [],
    cart: [],
    isLoading: false,
  },

  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const foundEl = state.cart.find(({ id }) => id === payload.id);
      if (foundEl) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else newCart.push({ ...payload, quantity: 1 });
      state.cart = newCart;
    },
  },
  //   extraReducers: (builder) => {
  // builder.addCase(getCategories.fulfilled, (state, action) => {
  //   state.list = action.payload;
  //   state.isLoading = false;
  // });
  // builder.addCase(getCategories.pending, (state) => {
  //   state.isLoading = true;
  // });
  // builder.addCase(getCategories.rejected, (state) => {
  //   state.isLoading = false;
  //   alert("Cannot load page!");
  // });
  //   },
});

export const { addItemToCart } = userSlice.actions;

export default userSlice.reducer;
