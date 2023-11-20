import React from "react";
import Layout from "./layout/Layout";
import BookContainer from "./book/BookContainer";
import Login from "./user/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack'
import Auth from "./Auth";
import Register from "./user/Register";

const App = () => {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<Auth><BookContainer /> </Auth>} />
           
          </Routes>
        </Layout>
      </BrowserRouter>
    </SnackbarProvider>
    
  )
};

export default App;
