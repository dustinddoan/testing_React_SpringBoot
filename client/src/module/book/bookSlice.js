import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../config";
import axios from "axios";
export const GET_BOOK = 'getBook';

export const getBooksAction = createAsyncThunk(GET_BOOK, async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/books`);
    console.log("Axios Response:", response);
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error; // Rethrow the error so that it can be handled by the rejected action
  }
});

const initialState = {
  books: [],
  requestStatus: {
    isPending: false,
    isFulfilled: false,
    isReject: false
  }  
};

const bookSlice = createSlice({
  name: "bookReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooksAction.pending, (state, action) => {
    
      return (state = {
        ...state,
        books: [],
        requestStatus: {
          isPending: true,
          isFulfilled: false,
          isReject: false,
        },
      });
    });
    builder.addCase(getBooksAction.fulfilled, (state, action) => {
      console.log("Fulfilled Action Payload:", action.payload);
      
      return (state = {
        ...state,
        books: action.payload,
        requestStatus: {
          isPending: false,
          isFulfilled: true,
          isReject: false,
        },
      });

    });
    builder.addCase(getBooksAction.rejected, (state, action) => {
      console.error("Rejected Action Error:", action.error);
      
      return (state = {
        ...state,
        books: [],
        requestStatus: {
          isPending: false,
          isFulfilled: false,
          isReject: true,
        },
      });
    });
  },
});


export const selectBooks = (state) => {
  return state.bookReducer.books; // Return the selected data
};
export const selecteBookStatus = (state) => {
  return state.bookReducer.requestStatus;
}


export default bookSlice.reducer;
