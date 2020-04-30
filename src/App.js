import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/homepage/Homepage";
import ShopPage from "./pages/shoppage/Shoppage";
import Header from "./components/header/Header";
import Login from "./pages/Login/Login";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
