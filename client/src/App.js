import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

// Custom tags
import PrivateRoute from "./components/common/PrivateRoute";

// Components
import AddEducation from "./components/addCreds/addEdu";
import AddExperience from "./components/addCreds/addExp";
import CreateProfile from "./components/createProfile/CreateProfile";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/editProfile/EditProfile";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/notFound/notFound";
import Post from "./components/post/Post";
import Posts from "./components/posts/Posts";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
import Register from "./components/auth/Register";

// Redux
import { clearCurrentProfile } from "./actions/profileActions";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token && get user info / expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    // Redirect to Home Screen
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Navbar />
            </Switch>

            <div className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
                <PrivateRoute exact path="/feed" component={Posts} />
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/user/:userId" component={Profile} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/not-found" component={NotFound} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
