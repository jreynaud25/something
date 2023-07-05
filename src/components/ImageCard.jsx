import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { useNavigate } from "react-router-dom";
// import "./testSliderStyle.css";
import "./ImageCard.css";
import images from "../../public/images.json";

const ImageCard = ({ direction }) => {
  const [loaded, setLoaded] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [width, setWidth] = useState(1000);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 2000) {
      setWidth(2000);
    } else if (window.innerWidth > 1000) {
      setWidth(1500);
    } else if (window.innerWidth > 700) {
      setWidth(900);
    } else if (window.innerWidth > 500) {
      setWidth(700);
    } else {
      setWidth(500);
    }

    if(window.innerWidth < 900){
      console.log("less tahn 900")
      setMobile(true);
    }
    console.log(isMobile)
    console.log("width", window.innerWidth, width);
  }, [width, window.innerWidth]);
  // const [sortedData, setSortedData] = React.useState(null);
  // console.log("images data", images);
  //Fetching data from cloudinary
  // useEffect(() => {
  //   const url =
  //     "https://res.cloudinary.com/dci6ayb3x/image/list/SOMETHING.json";

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("raw data", data);

  //       let sorting = data.resources.sort((a, b) => {
  //         const imageNumberA = parseInt(a.public_id.split("_")[1]);
  //         const imageNumberB = parseInt(b.public_id.split("_")[1]);
  //         return imageNumberA - imageNumberB;
  //       });
  //       setSortedData(sorting);
  //       console.log("sorted data", sorting);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  useEffect(() => {
    const new_loaded = [...loaded];
    new_loaded[currentSlide] = true;
    setLoaded(new_loaded);
  }, [currentSlide]);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `product`;
    navigate(path);
  };

  const WheelControls = (slider) => {
    let touchTimeout;
    let position;
    let wheelActive;

    function dispatch(e, name) {
      position.x -= e.deltaX;
      if (direction === "left") {
        position.y -= e.deltaY;
      }
      if (direction === "right") {
        position.y += e.deltaY;
      }
      slider.container.dispatchEvent(
        new CustomEvent(name, {
          detail: {
            x: position.x,
            y: position.y,
          },
        })
      );
    }

    function wheelStart(e) {
      position = {
        x: e.pageX,
        y: e.pageY,
      };

      dispatch(e, "ksDragStart");
    }

    function wheel(e) {
      dispatch(e, "ksDrag");
    }

    function wheelEnd(e) {
      dispatch(e, "ksDragEnd");
    }

    function eventWheel(e) {
      e.preventDefault();
      if (!wheelActive) {
        wheelStart(e);
        wheelActive = true;
      }
      wheel(e);
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        wheelActive = false;
        wheelEnd(e);
      }, 50);
    }

    slider.on("created", () => {
      window.addEventListener("wheel", eventWheel, {
        passive: false,
      });
      window.addEventListener(
        "touchmove",
        () => {
          window.trigger("wheel");
        },
        {
          passive: false,
        }
      );
    });
  };

  const randomScroll = (slider) => {
      setInterval(() => {
        if (isMobile) {
        let ran = Math.floor(Math.random() * (110 - 0 + 1) + 0);
        slider.moveToIdx(ran);
        }
      }, 1500);
  };

  const [sliderRef] = useKeenSlider(
    {
      animationEnded(s) {
        setCurrentSlide(s.track.details.rel);
      },
      loop: true,
      rubberband: false,
      vertical: true,
    },
   [WheelControls, randomScroll]
  );
  // console.log("sorted data", sortedData);

  return images ? (
    <div onClick={routeChange} ref={sliderRef} className="keen-slider">
      {direction === "left"
        ? Array.from({ length: 110 }, (_, i) => (
            <div className="keen-slider__slide number-slide1" key={i}>
              <img
                src={
                  loaded[i]
                    ? `https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,f_auto,q_90,w_${width}/v1687789598/${
                        images[2 * i + 1].public_id
                      }`
                    : `https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,f_auto,q_10,w_${width}/v1687789598/${
                        images[2 * i + 1].public_id
                      }`
                }
                alt=""
              />
            </div>
          ))
        : Array.from({ length: 110 }, (_, i) => (
            <div className="keen-slider__slide number-slide1" key={i}>
              <img
                src={
                  loaded[i]
                    ? `https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,f_auto,q_90,w_${width}/v1687789598/${
                        images[2 * i + 2].public_id
                      }`
                    : `https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,f_auto,q_10,w_${width}/v1687789598/${
                        images[2 * i + 2].public_id
                      }`
                }
                alt=""
              />
            </div>
          ))}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default ImageCard;
