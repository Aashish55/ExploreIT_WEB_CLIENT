import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import './index.css'

import Homepage from './Components/Homepage/Homepage';
// import Travels from './Components/Travels/Travels';
// import Hotels from './Components/Hotels/Hotels'
// import Adventures from './Components/Adventures/Adventures'
import Login from './Components/Auth/Login'
import Registration from './Components/Auth/Registration'


class root extends Component {
  state = {}
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/login' component={Login} />
        <Route path='/registration' component={Registration} />
      </Switch>
    );
  }
}

const Root = withRouter(root)

ReactDOM.render(<Router>
  <Root />
</Router>,
  document.getElementById('root')
);
serviceWorker.unregister();