import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import RestaurantRoute from "./auth/RestaurantRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import RestaurantDashboard from "./user/RestaurantDashboard";
import Profile from "./user/Profile";
import AddCategory from "./restaurant/AddCategory";
import AddProduct from "./restaurant/AddProduct";
import UpdateProduct from "./restaurant/UpdateProduct";
import ManageProducts from "./restaurant/ManageProducts";
import RestaurantProfile from "./restaurant/RestaurantProfile";
import Orders from "./restaurant/Orders";
import ManageUsers from "./admin/ManageUsers";
import AddRestaurant from "./admin/AddRestaurant";
import ManageRestaurants from "./admin/ManageRestaurants";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/users/:userId" exact component={ManageUsers} />
        <AdminRoute path="/admin/signup" exact component={AddRestaurant} />
        <AdminRoute path="/restaurants" exact component={ManageRestaurants} />
        <AdminRoute
          path="/update/:restaurantId"
          exact
          component={RestaurantProfile}
        />
        <RestaurantRoute
          path="/restaurant/dashboard"
          exact
          component={RestaurantDashboard}
        />
        <RestaurantRoute
          path="/create/category"
          exact
          component={AddCategory}
        />
        <RestaurantRoute path="/create/product" exact component={AddProduct} />
        <RestaurantRoute path="/restaurant/orders" exact component={Orders} />
        <RestaurantRoute
          path="/admin/products"
          exact
          component={ManageProducts}
        />
        <RestaurantRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
