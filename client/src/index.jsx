import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { Provider } from 'react-redux'
import setupStore from './util/store';
import axios from 'axios';

axios.interceptors.request.use(
  (config) => { 
    const token = localStorage.getItem('bookstore-token');
    if (!!token) { 
      config.headers['Authorization'] = token;
     
    }
    return config;
  },
  (error) => Promise.reject(error),
)



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





