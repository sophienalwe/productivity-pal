// src/components/MotivationButton.js//
import React from "react";

export default function MotivationButton() {
  const handleClick = () => {
    alert("You got this. God's timing is perfect, and so is your effort today. 🕊️✨");
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 ml-4 text-sm text-blue-600 hover:underline"
    >
      I feel overwhelmed 😩
    </button>
  );
}