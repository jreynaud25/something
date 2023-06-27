import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";

export default function Product() {
  const handleClick = () => {};

  return (
    <>
      <Link to="https://buy.stripe.com/9AQ8xN2eyeLN9NueUU">
        <button className="buy-btn">Buy Something</button>
      </Link>
      <section className="contrib-section">
        <div className="contrib-wrapper">
          <span>Marilou Bal</span>
          <span>Marius Astruc</span>
          <span>J.J. Berrod</span>
          <span>Esther Blanchot</span>
          <span>Paul Bouigue</span>
          <span>Anna Castellano</span>
          <span>Marcello Concari</span>
          <span>Luna Conte</span>
          <span>Lola Dement Myers</span>
          <span>GB Ezequiel</span>
          <span>Oskar Fougeirol</span>
          <span>Basile Fournier</span>
          <span>Lukas Gschwandtner</span>
          <span>Hugo Hectus</span>
          <span>Ikki Casting</span>
          <span>Malik Jeannet</span>
          <span>Gabriel Hafner</span>
          <span>Ulysse Lozano</span>
          <span>Emma Le Doyen</span>
          <span>Pavo Marinović</span>
          <span>Mindaugas Matulis</span>
          <span>Igor Pjorrt</span>
          <span>Maxime Pouillot</span>
          <span>Jorge Regula</span>
          <span>Haydee Touitou</span>
          <span>Pierre Vanni</span>
          <span>Caroline Ventura</span>
          <span>Louis Vinhtong</span>
          <span>Georges Wendell</span>
          <span>Melek Zertal</span>
        </div>
      </section>
      <section className="about-section">
        <div className="product-wrapper">
          <div className="product-image-wrapper">
            <img src="https://res.cloudinary.com/dci6ayb3x/image/upload/v1687789598/IMAGE_2_t39xxq"></img>
          </div>
          <div className="product-info-wrapper">
            <span>
              Our first issue is themed around the idea of Twentysomething.{" "}
              <br></br>A person between 20 and 29 years old, a person not so
              young but not so old at the same time.
            </span>
          </div>
        </div>
      </section>
      <Link to="https://buy.stripe.com/9AQ8xN2eyeLN9NueUU">
        <button>Buy Something 25€</button>
      </Link>
    </>
  );
}
