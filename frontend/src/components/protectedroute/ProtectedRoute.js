import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        //   this restrict the radom user from accessing the mdashboard(uncomment to allow all)
        // if (!localStorage.getItem("user")) return <Redirect to="/" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
