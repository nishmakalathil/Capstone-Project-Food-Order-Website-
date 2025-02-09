
import React, { useState, useEffect } from "react";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 4 ? 1 : prevSlide + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="carousel w-full h-screen overflow-hidden relative">
      {/* Video Slide 1 */}
      <div
        id="slide1"
        className={`carousel-item relative w-full h-full ${currentSlide === 1 ? "block" : "hidden"}`}
      >
        <video
          src="https://res.cloudinary.com/dbkexrtm3/video/upload/v1738608890/vecteezy_craft-beef-burger-and-french-fries-on-a-black-background_3580260_gapkhq.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Video Slide 2 */}
      <div
        id="slide2"
        className={`carousel-item relative w-full h-full ${currentSlide === 2 ? "block" : "hidden"}`}
      >
        <video
          src="https://res.cloudinary.com/dbkexrtm3/video/upload/v1738609460/vecteezy_people-eating-sponge-cake-with-spoon_4715590_v97oad.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Video Slide 3 */}
      <div
        id="slide3"
        className={`carousel-item relative w-full h-full ${currentSlide === 3 ? "block" : "hidden"}`}
      >
        <video
          src="https://res.cloudinary.com/dbkexrtm3/video/upload/v1738608437/vecteezy_close-up-spaghetti-and-tomato-sauce-on-the-plate-long_5167074_xxon4e.mov"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide4" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Video Slide 4 */}
      <div
        id="slide4"
        className={`carousel-item relative w-full h-full ${currentSlide === 4 ? "block" : "hidden"}`}
      >
        <video
          src="https://res.cloudinary.com/dbkexrtm3/video/upload/v1739034292/vecteezy_scoop-ice-cream-strawberry-closeup-front-view-food-concept_4444666_au8ves.mov"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
