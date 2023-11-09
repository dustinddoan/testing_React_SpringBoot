import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import setupStore from "./store";


const renderWithRedux = (
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    // console.log("UTIL store: ", store.getState());
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithRedux;






