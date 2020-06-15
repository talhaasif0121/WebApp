import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getRestaurants, deleteRestaurant } from "./apiAdmin";

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  const { user, token } = isAuthenticated();

  const loadRestaurants = () => {
    getRestaurants(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRestaurants(data);
      }
    });
  };

  const destroy = (restaurantId) => {
    deleteRestaurant(restaurantId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadRestaurants();
      }
    });
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <Layout
      title="Manage Restaurants"
      description="Update and Delete Restaurants"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">
            Total {restaurants.length} restaurants
          </h2>
          <hr />
          <ul className="list-group">
            {restaurants.map((r, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{r.name}</strong>
                <Link to={`/update/${r._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  onClick={() => destroy(r._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageRestaurants;
