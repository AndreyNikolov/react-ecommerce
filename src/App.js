import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/homepage/Homepage";
import ShopPage from "./pages/shoppage/Shoppage";
import Header from "./components/header/Header";
import Login from "./pages/Login/Login";
import "./App.css";
import { auth, createUserProfile } from "./firebase/firebaseUtils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unsubscribteFroumAuth = null;

  componentDidMount() {
    this.unsubscribteFroumAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfile(userAuth);
        (await userRef).onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribteFroumAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
