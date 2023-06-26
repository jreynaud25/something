import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { useNavigate } from "react-router-dom";
import "./testSliderStyle.css";
import "./ImageCard.css";

const ImageCard = ({ direction }) => {
  const [loaded, setLoaded] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const new_loaded = [...loaded];
    new_loaded[currentSlide] = true;
    setLoaded(new_loaded);
  }, [currentSlide]);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `product`; 
    navigate(path);
  }

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
    });
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
    [WheelControls]
  );

  return (
    <div onClick={routeChange} ref={sliderRef} className="keen-slider">
      {direction === "left"
        ? Array.from({ length: 118 }, (_, i) => (
            <div className="keen-slider__slide number-slide1" key={i}>
              <img
                src={
                  loaded[i]
                    ? `./../../public/images/IMAGE_${2 * i + 2}.png`
                    : ""
                }
                alt=""
              />
            </div>
          ))
        : Array.from({ length: 118 }, (_, i) => (
            <div className="keen-slider__slide number-slide1" key={i}>
              <img
                src={
                  loaded[i]
                    ? `./../../public/images/IMAGE_${2 * i + 1}.png`
                    : ""
                }
                alt=""
              />
            </div>
          ))}
    </div>
  );
};

export default ImageCard;
