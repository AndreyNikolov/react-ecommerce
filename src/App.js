import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/Homepage';
import ShopPage from './pages/shoppage/Shoppage';
import Header from './components/header/Header';
import Login from './pages/Login/Login';
import { auth, createUserProfile } from './firebase/firebaseUtils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unsubscribteFromAuth = null;

  componentDidMount() {
    this.unsubscribteFromAuth = auth.onAuthStateChanged(async (userAuth) => {
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

      this.setState({
        currentUser: userAuth,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribteFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />{' '}
        <Switch>
          <Route exact path="/" component={HomePage} />{' '}
          <Route path="/shop" component={ShopPage} />{' '}
          <Route path="/signin" component={Login} />{' '}
        </Switch>{' '}
      </div>
    );
  }
}

export default App;
