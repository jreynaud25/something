import React from "react";
import TopBar from "./../components/TopBar";
import ImageCard from "./../components/ImageCard";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <div className="images-slider">
        <ImageCard direction="left" />
        <ImageCard direction="right" />
      </div>
    </div>
  );
};

export default HomePage;
