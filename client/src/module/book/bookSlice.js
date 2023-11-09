import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../config";
import axios from "axios";
export const GET_BOOK = "getBook";

export const getBooks = createAsyncThunk('books/getBooks', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/books`);
    // console.log("Axios Response:", response);
    return response.data;
  } catch (error) {
    // console.error("Axios Error:", error);
    throw error; // Rethrow the error so that it can be handled by the rejected action
  }
});

export const getBooksByTitle = createAsyncThunk(
  "books/getBooksByTitle",
  async (title) => {
    try {
      // console.log("title: ", title)
      const response = await axios.get(`${baseUrl}/api/v1/books/${title}`);
      // console.log("Axios Response getBookByTitle:", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const INITIAL_BOOK_REDUCER_STATE = {
  books: [],
  requestStatus: 'uninitilaized',
  error: null
};

const bookSlice = createSlice({
  name: "bookReducer",
  initialState: INITIAL_BOOK_REDUCER_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state, action) => {
      state.requestStatus = "loading";
    });

    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.requestStatus = "succeeded";
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.requestStatus = "failed";
      state.error = action.error.message;
  
    });
    builder.addDefaultCase((state, action) => {
      return state;
    });
  },
});


// export const selectBooks = (state) => {
//   return state.bookReducer.books; // Return the selected data
// };
// export const selecteBookStatus = (state) => {
//   return state.bookReducer.requestStatus;
// };

// export const { reducer, actions } = bookSlice;


export default bookSlice.reducer;
