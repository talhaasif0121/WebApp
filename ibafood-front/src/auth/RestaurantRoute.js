import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./index";

const RestaurantRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 2 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default RestaurantRoute;
