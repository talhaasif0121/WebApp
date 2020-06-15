import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../core/Layout";
import { createRestaurant } from "./apiAdmin";
import { isAuthenticated } from "../auth";

const RestaurantSignup = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: 2,
    error: "",
    success: false,
  });

  const { name, email, password, role, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createRestaurant({ name, email, password, role }, user._id, token).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            role: 2,
            error: "",
            success: true,
          });
        }
      }
    );
  };

  const signupForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Restaurant Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New restaurant is created!
      </div>
    );
  };

  return (
    <Layout
      title="Restaurant Signup"
      description="Create a restaurant on our platform"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signupForm()}
    </Layout>
  );
};

export default RestaurantSignup;
