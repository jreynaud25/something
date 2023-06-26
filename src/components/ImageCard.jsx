import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "./testSliderStyle.css";
import "./ImageCard.css";

const ImageCard = ({ direction }) => {
  const [loaded, setLoaded] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sortedData, setSortedData] = React.useState(null);

  React.useEffect(() => {
    const url =
      "https://res.cloudinary.com/dci6ayb3x/image/list/SOMETHING.json";
    // Fetch the JSON data
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Sort the JSON based on the image number in the "public_id" property
        console.log("my data", data);
        setSortedData(
          data.resources.sort((a, b) => {
            const imageNumberA = parseInt(a.public_id.split("_")[1]);
            const imageNumberB = parseInt(b.public_id.split("_")[1]);
            return imageNumberA - imageNumberB;
          })
        );

        // Output the sorted JSON
        //   console.log(JSON.stringify(sortedData, null, 4));
        console.log("sorted", sortedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [sortedData]);

  React.useEffect(() => {
    const new_loaded = [...loaded];
    new_loaded[currentSlide] = true;
    setLoaded(new_loaded);
  }, [currentSlide]);

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

  return sortedData ? (
    <div ref={sliderRef} className="keen-slider">
      {direction === "left"
        ? Array.from({ length: 10 }, (_, i) => (
            <div className="keen-slider__slide number-slide1" key={i}>
              <img
                src={
                  loaded[i]
                    ? `https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,q_90,w_1920/v1687789598/${
                        sortedData[2 * i + 1].public_id
                      }`
                    : ""
                }
                alt=""
              />
            </div>
          ))
        : Array.from({ length: 10 }, (_, i) => (
            <div className="keen-slider__slide number-slide1" key={i}>
              <img
                src={
                  loaded[i]
                    ? `https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,q_90,w_1920/v1687789598/${
                        sortedData[2 * i + 2].public_id
                      }`
                    : ""
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
