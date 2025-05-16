// src/components/OutputDisplay.js
import React from "react";

export default function OutputDisplay({ plan }) {
  if (!plan) return null;

  return (
    <div className="mt-6 bg-gray-50 border border-gray-200 rounded p-4 whitespace-pre-wrap">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">Your Personalized Plan:</h3>
      <p>{plan}</p>
    </div>
  );
}