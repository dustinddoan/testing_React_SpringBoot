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

// export const initialState = {
//   books: [],
//   requestStatus: 'uninitialized',
//   error: null
// };

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    requestStatus: "uninitialized",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state, action) => {
      // console.lolg("State: ", state)
      state.requestStatus = "loading";
    });

    builder.addCase(getBooks.fulfilled, (state, action) => {
      // console.log("state.books", state.books);
      // console.log("state.books", action.payload);
      state.books = action.payload;
      state.requestStatus = "succeeded";
    });

    builder.addCase(getBooks.rejected, (state, action) => {
      state.requestStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(getBooksByTitle.pending, (state, action) => {
      state.requestStatus = "loading";
    });

    builder.addCase(getBooksByTitle.fulfilled, (state, action) => {
      state.books = action.payload;
      state.requestStatus = "succeeded";
    });
    builder.addCase(getBooksByTitle.rejected, (state, action) => {
      state.requestStatus = "failed";
      state.error = action.error.message;
    });
    // builder.addDefaultCase((state = initialState, action) => {
    //   // console.log("STATE: ", state.books)
    //   return state;
    // });
  },
});


export const selectBooks = (state) => state.book.books;
export const selecteRequestStatus = (state) => state.book.requestStatus;


// export const {reducer: bookReducer, actions} = bookSlice
export default bookSlice.reducer;
