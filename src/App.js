import React from 'react';
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Home from './Pages/Home';
import Success from './Pages/Success';
import Error from './Pages/Error'
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import { useSelector } from "react-redux";
import './App.css'

function App() {
    
    const user = useSelector((state) => state.user.currentUser);
    
    return (
        <Router>
      <Switch>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/error">
          <Error />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    )
}

export default App
