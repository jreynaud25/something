import React from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import "../components/TopBar.css";

const ProductPage = () => {
  return (
    <>
       <Link to="https://buy.stripe.com/9AQ8xN2eyeLN9NueUU">
        <button className="back-btn">ADD TO CART 25€</button>
      </Link>
      <Product direction="left" />
    </>
  );
};

export default ProductPage;
