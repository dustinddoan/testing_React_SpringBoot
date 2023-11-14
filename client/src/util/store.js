import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import bookSlice from '../module/book/bookSlice';

const rootReducer = combineReducers({
  book: bookSlice
})

// export function setupStore(preloadedState) {
//   return configureStore({
//     reducer: rootReducer,
//     preloadedState
//   })
// }



const setupStore = preloadedState => {
  console.log("rootreducer: ", rootReducer)
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}


export default setupStore;