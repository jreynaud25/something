import React from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import "../components/TopBar.css";

const ProductPage = () => {
  return (
    <>
      <Link to="/">
        <button className="back-btn" style={{ cursor: "cell" }}>
          Back
        </button>
      </Link>
      <Product />
    </>
  );
};

export default ProductPage;
