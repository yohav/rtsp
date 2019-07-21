import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';


const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/myurls" component={Profile} />
    </Switch>
  </div>
);

export default Routes;
