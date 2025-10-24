import React, { useState } from "react";
import "./Carousel.css";

export default function Carousel({ uploads }) {
  // Only show images/videos that have a previewUrl
  const items = uploads.filter((item) => item.previewUrl);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (items.length === 0) return "";

  const currentItem = items[currentIndex];

  return (
    <div className="carousel-container">
      <button className="arrow left" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="carousel-slide">
        {currentItem.isVideo ? (
          <video src={currentItem.previewUrl} controls />
        ) : (
          <img src={currentItem.previewUrl} alt={currentItem.description} />
        )}
      </div>

      <button className="arrow right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}
