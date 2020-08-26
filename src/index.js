import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setUser, clearUser } from './action';
import './index.css'
import { setAuthorization } from './utils/setAuthorization';
import jwt from 'jsonwebtoken';

import Homepage from './Components/Homepage/Homepage';
// import Travels from './Components/Travels/Travels';
// import Hotels from './Components/Hotels/Hotels'
// import Adventures from './Components/Adventures/Adventures'
import Login from './Components/Auth/Login'
import Registration from './Components/Auth/Registration'
import Home from './Components/Home';

const store = createStore(rootReducer, composeWithDevTools())

class Root extends Component {

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthorization(localStorage.jwtToken)
      this.props.setUser(jwt.decode(localStorage.jwtToken));
      this.props.history.push('/home')
    }else{
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/login' component={Login} />
        <Route path='/registration' component={Registration} />
        <Route path='/home' component={Home} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root));

ReactDOM.render(<Provider store={store}>
  <Router>
    <RootWithAuth />
  </Router>
</Provider>, document.getElementById('root'));
serviceWorker.unregister();