// TaskInput.js
import React from "react";

export default function TaskInput({ taskText, setTaskText }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        What do you need to do today?
      </label>
      <textarea
        rows={5}
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="E.g. finish math homework, do laundry, apply to 2 jobs..."
      />
    </div>
  );
}
