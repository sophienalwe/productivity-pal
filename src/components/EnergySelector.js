import React from "react";

export default function EnergySelector({ energy, setEnergy }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        How's your energy?
      </label>
      <div className="flex gap-4">
        {["low", "medium", "high"].map((level) => (
          <label key={level} className="flex items-center space-x-2">
            <input
              type="radio"
              value={level}
              checked={energy === level}
              onChange={(e) => setEnergy(e.target.value)}
            />
            <span className="capitalize">{level}</span>
          </label>
        ))}
      </div>
    </div>
  );
}