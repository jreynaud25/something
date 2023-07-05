import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { useNavigate } from "react-router-dom";
// import "./testSliderStyle.css";
import "./Product.css";
import images from "../../public/images.json";

const Product = ({ direction }) => {
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
    } else if (window.innerWidth <= 900) {
      setMobile(true);
    } else if (window.innerWidth >= 900) {
      setMobile(false);
    } else {
      setWidth(500);
    }
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
  // console.log("sorted data", sortedData);

  return images ? (
    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1">
        {isMobile ? (
          <img
            src="https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,f_auto,q_100,w_2000/v1687789598/COVER_FRONT_qpc6xv_qomzh4"
            alt=""
          />
        ) : (
          <img
            src="https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,f_auto,q_100,w_2000/v1687789598/COVER_FRONT_qpc6xv"
            alt=""
          />
        )}
      </div>
      <div
        className="keen-slider__slide number-slide1"
        style={{
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <span className="text" style={{ maxWidth: "55ch" }}>
          Our first issue is themed around the idea of the Twentysomething. “A
          person between 20 and 29 years old, a person not so young but not so
          old at the same time.”
          <br></br>
          <br></br>
          Print 200 copies, Format: 230 x 300 mm, Paper: 135g - Semi-Matte
          Coated, 135g - Glossy Coated
        </span>
      </div>

      <div className="keen-slider__slide number-slide1">
        <img
          src="https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,f_auto,q_100,w_2000/v1687789598/COVER_FRONT-2-2_ohjg4k"
          alt=""
        />
      </div>

      <div
        className="keen-slider__slide number-slide1"
        style={{
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          width: "100vw",
        }}
      >
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

      <div className="keen-slider__slide number-slide1">
        {isMobile ? (
          <img
            src="https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,f_auto,q_100,w_2000/v1687789598/WhatsApp_Image_2023-07-05_at_11.25.44_saarxh
            "
            alt=""
          />
        ) : (
          <img
            src="https://res.cloudinary.com/dci6ayb3x/image/upload/c_scale,f_auto,q_100,w_2000/v1687789598/WhatsApp_Image_2023-07-05_at_11.25_g21z6u"
            alt=""
          />
        )}
      </div>

      <div
        className="keen-slider__slide number-slide1"
        style={{
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <span className="text" style={{ maxWidth: "55ch" }}>
          In order to create a unique and relevant curation, each contributor’s
          response is freely presented in individual booklets. During the
          launch, we invite visitors to explore, curate, and select them as they
          desire, thereby giving them the opportunity to compose their own
          unique edition of Something.
        </span>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Product;
