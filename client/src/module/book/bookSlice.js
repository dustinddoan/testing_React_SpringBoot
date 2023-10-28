import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../config";
import axios from "axios";

export const getBooksAction = createAsyncThunk('getBook', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/books`);
    // console.log("Axios Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error; // Rethrow the error so that it can be handled by the rejected action
  }
});

const initialState = {
    books: []
};

const bookSlice = createSlice({
  name: "bookReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooksAction.pending, (state, action) => {
      state.books = [];
    });
    builder.addCase(getBooksAction.fulfilled, (state, action) => {
      console.log("Fulfilled Action Payload:", action.payload);
      state.books = action.payload;
    });
    builder.addCase(getBooksAction.rejected, (state, action) => {
      console.error("Rejected Action Error:", action.error);
    });
  },
});

export const selectBooks = (state) => {
//   console.log("STATE: ", state);
  return state.bookReducer.books; // Return the selected data
};
export default bookSlice.reducer;
