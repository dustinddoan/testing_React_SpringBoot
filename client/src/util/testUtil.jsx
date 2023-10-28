import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { setupStore } from "../module/store";



const renderWithRedux = (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    // console.log("UTIL children: ", children.props);
    return <Provider store={store}>{children}</Provider>;
  };
  // console.log("UTIL ui: ", ui);
  // console.log("UTIL store: ", store.getState());


  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithRedux;




