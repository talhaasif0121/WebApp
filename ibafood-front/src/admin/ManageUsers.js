import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getUsers, deleteProfile } from "./apiAdmin";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  const loadUsers = () => {
    getUsers(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  const destroy = (profileId) => {
    deleteProfile(profileId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadUsers();
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout
      title="Manage Users"
      description="Delete Users"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {users.length} users</h2>
          <hr />
          <ul className="list-group">
            {users.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <span
                  onClick={() => destroy(p._id)}
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

export default ManageUsers;
