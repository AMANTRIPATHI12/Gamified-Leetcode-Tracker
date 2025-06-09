import React from "react";
import "./fireflies.css";

const Fireflies = ({ count = 25 }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="firefly" />
      ))}
    </div>
  );
};

export default Fireflies;
