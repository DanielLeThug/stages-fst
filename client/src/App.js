import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import { Register, Login } from "./Components/Auths";
import { PrivateRoute, AdminRoute } from "./Components/Commons";
import { Formulaire, EditForm, CompanyDetails } from "./Components/Forms";
import { Navbar, Footer } from "./Components/Layouts";
import { NotFound, Unauthorized } from "./Components/Others";
import { Posts, Post } from "./Components/Posts";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/company-details/:id"
              component={CompanyDetails}
            />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/form" component={Formulaire} />
            </Switch>
            <Switch>
              <AdminRoute exact path="/edit" component={EditForm} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
