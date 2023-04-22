import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-bar-container">
      <Link to="/">Home</Link>
      <Link to="/restaurant-detail">Most Popular</Link>
    </div>
  );
}
