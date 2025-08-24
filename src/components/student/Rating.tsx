import React, { useEffect, useState } from "react";

const Rating = ({ initialRating }: { initialRating: number }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleRating = (value: number) => {
    setRating(value);
    // If you want to notify parent: onRate?.(value)
  };

  useEffect(() => {
    setRating(initialRating || 0);
  }, [initialRating]);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, idx) => {
        const starValue = idx + 1; 
        return (
          <span
            onClick={() => handleRating(starValue)}
            key={idx}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
