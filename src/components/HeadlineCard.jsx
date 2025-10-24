import React from "react";
import Carousel from "./Carousel";
import "./HeadlineCard.css";

export default function HeadlineCard({ uploads }) {
  return (
    <div className="headline-card">
      <div className="headline-content">
        <h1 className="headline-text">
          A <span className="first-line">Home </span>
          <br />
          for Your <span className="second-line">Creativity,</span>
          <br /> Start your <br />
          <span className="fourth-line">journey</span> now...
        </h1>

        <div className="headline-carousel">
          <Carousel uploads={uploads} />
        </div>
      </div>
    </div>
  );
}
