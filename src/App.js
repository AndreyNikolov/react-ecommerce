import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/Homepage/Homepage';
import ShopPage from './pages/Shoppage/Shoppage';
import Header from './components/header/Header';
import Login from './pages/Login/Login';
import { auth, createUserProfile } from './firebase/firebaseUtils';
import { setCurrentUser } from './redux/user/userActions';

class App extends React.Component {
  unsubscribteFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribteFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfile(userAuth);
        (await userRef).onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribteFromAuth();
  }

  render() {
    return (
      <div>
        <Header />{' '}
        <Switch>
          <Route exact path="/" component={HomePage} />{' '}
          <Route path="/shop" component={ShopPage} />{' '}
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <Login />
            }
          />{' '}
        </Switch>{' '}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
