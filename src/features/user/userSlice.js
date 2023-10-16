import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export const createUser = createAsyncThunk("users/createUser", async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
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
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      //   state.isLoading = false;
    });
    // builder.addCase(getCategories.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getCategories.rejected, (state) => {
    //   state.isLoading = false;
    //   alert("Cannot load page!");
    // });
  },
});

export const { addItemToCart, toggleForm } = userSlice.actions;

export default userSlice.reducer;
