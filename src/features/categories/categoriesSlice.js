import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const initialState = {
  list: [],
  isLoading: false,
};

export const getCategories = createAsyncThunk("categories/getCategories", async (_, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/categories`);
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      alert("Cannot load page!");
    });
  },
});

export default categoriesSlice.reducer;
