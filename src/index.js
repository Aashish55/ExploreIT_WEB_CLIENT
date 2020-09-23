import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setUser, clearUser } from "./action";
import "./index.css";
import { setAuthorization } from "./utils/setAuthorization";
import jwt from "jsonwebtoken";
import Login from "./Components/Auth/Login";
import Registration from "./Components/Auth/Registration";
import Home from "./Components/Home";
import Booking from "./Components/Booking";
import Spinner from "./Components/Spinner/Spinner";

const store = createStore(rootReducer, composeWithDevTools());

const Root = (props) => {
  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthorization(localStorage.jwtToken);
      props.setUser(jwt.decode(localStorage.jwtToken));
      props.history.push("/booking");
    } else {
      props.history.push("/");
      props.clearUser();
    }
  }, []);

  return props.isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/registration" exact component={Registration} />
      <Route path="/booking" component={Booking} />
    </Switch>
  );
};

const mapStateFromProps = (state) => ({
  isLoading: state.user.isLoading,
});

const RootWithAuth = withRouter(
  connect(mapStateFromProps, { setUser, clearUser })(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
