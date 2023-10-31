import { configureStore, combineReducers } from "@reduxjs/toolkit";

import bookReducer from "./book/bookSlice"

// console.log("bookReducer: ", {bookReducer})

// reducer is responsibel fro exhanging the Redux store
// its a pure function that has state and action
const initialState = {
  books: [],
  requestStatus: {
    isPending: false,
    isFulfilled: false,
    isReject: false,
  },
};

export const rootReducer = combineReducers({
    bookReducer
})

export const setupStore = preloadedState => {
    // console.log("preloadedState", preloadedState);
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })

} 


