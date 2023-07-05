import React from "react";
import TopBar from "./../components/TopBar";
import ImageCard from "./../components/ImageCard";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `product`;
    navigate(path);
  };

  return (
    <div className="home">
      <div onClick={routeChange} className="images-slider">
        <ImageCard direction="left" />
        <ImageCard direction="right" />
      </div>
    </div>
  );
};

export default HomePage;
