import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (  
    <div className="admin-dashboard container mt-5">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <ul className="dashboard-menu">
        <li>
          <Link to="/admin/products" className="dashboard-link">
            📦 Manage Products
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="dashboard-link">
            🛒 Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
    