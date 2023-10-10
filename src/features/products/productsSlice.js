import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const initialState = {
  list: [],
  isLoading: false,
};

export const getProducts = createAsyncThunk("products/getProducts", async (_, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/products`);
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
      alert("Cannot load page!");
    });
  },
});

export default productsSlice.reducer;
