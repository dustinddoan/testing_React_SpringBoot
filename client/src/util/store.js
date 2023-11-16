import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import bookReducer from '../module/book/bookSlice';
import userReducer from "../module/user/userSlice";

const rootReducer = combineReducers({
  book: bookReducer,
  user: userReducer
})

const setupStore = preloadedState => {
  console.log("rootreducer: ", rootReducer)
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}


export default setupStore;