import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

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
    
    return <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithRedux;






