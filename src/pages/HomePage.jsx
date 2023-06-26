import React from "react";
import TopBar from "./../components/TopBar";
import ImageCard from "./../components/ImageCard";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <TopBar />
      <div className="images-slider">
        <ImageCard direction="top" />
        <ImageCard direction="down" />
      </div>
    </div>
  );
};

export default HomePage;
