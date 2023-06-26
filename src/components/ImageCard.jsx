import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "./testSliderStyle.css";
import "./ImageCard.css";

const ImageCard = ({ direction }) => {
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
      loop: true,
      rubberband: false,
      vertical: true,
    },
    [WheelControls]
  );

  return (
    <div ref={sliderRef} className="keen-slider">
      {direction === "left"
        ? Array.from({ length: 10 }, (_, i) => (
            <div className="keen-slider__slide number-slide1" key={i}>
              <img src={`./../../public/images/IMAGE_${2 * i}.png`} alt="" />
            </div>
          ))
        : Array.from({ length: 10 }, (_, i) => (
            <div className="keen-slider__slide number-slide1" key={i}>
              <img
                src={`./../../public/images/IMAGE_${2 * i + 1}.png`}
                alt=""
              />
            </div>
          ))}
    </div>
  );
};

export default ImageCard;
