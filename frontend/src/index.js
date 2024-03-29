import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Login from "./login/Login.js";
import Register from "./register/Register.js";
import Dashboard from "./Dashboard/Dashboard";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
