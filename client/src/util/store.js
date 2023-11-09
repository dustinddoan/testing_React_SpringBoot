import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookReducer from "../module/book/bookSlice";

const rootReducer = combineReducers ({
  bookReducer,
});

// const setupStore = (preloadedState) => {
//   console.log("STORE PRELOADEDSTATE: ", preloadedState);
//   return configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   });
// };

// export default setupStore;
export default function setupStore(preloadedState) {
  // console.log("STORE PRELOADEDSTATE: ", preloadedState);
  const storeTemp =  configureStore({
    reducer: rootReducer,
    preloadedState
  })
    // console.log("STORE configureStore: ", storeTemp.getState());

  return storeTemp;
}