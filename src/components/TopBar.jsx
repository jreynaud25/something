import React from "react";
import { Link } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
  return (
    <Link to="/product">
      <button className="about-btn" style={{ cursor: "cell" }}>
        Buy
      </button>
    </Link>
  );
};

export default TopBar;
