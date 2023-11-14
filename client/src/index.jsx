import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { Provider } from 'react-redux'
import setupStore from './util/store';




const store = setupStore();

// console.log("STORE index: ", store.getState())

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





