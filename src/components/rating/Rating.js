import React, { useState } from "react";
import Star from "./Star";

const Rating = ({ maxRating = 5, color = "#fcc419", size = 24, onRating }) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const ratingContainer = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const starContainer = {
    display: "flex",
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  const handleRating = (userRating) => {
    setRating(userRating);
    onRating(userRating);
  };
  return (
    <div style={ratingContainer}>
      <div style={starContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            addRating={() => handleRating(i + 1)}
            showStar={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            size={size}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
};

export default Rating;
