import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'


import { rootReducer } from './module/store';

const store = configureStore({
  reducer: rootReducer
})


ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={store}
    >
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);





