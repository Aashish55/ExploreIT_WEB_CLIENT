import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import Homepage from './Components/Homepage/Homepage';
import Travels from './Components/Travels/Travels';
import Hotels from './Components/Hotels/Hotels'
import Adventures from './Components/Adventures/Adventures'



class root extends Component {
  state = {}
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/adventures' component={Adventures} />
        <Route path='/hotels' component={Hotels} />
        <Route path='/travels' component={Travels} />
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