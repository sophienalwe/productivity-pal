// TaskInput.js
import React from "react";

export default function TaskInput({ taskText, setTaskText }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        What do you need to do today?
      </label>
      <textarea
  className="w-full max-w-md p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  placeholder="E.g. finish math homework, do laundry, apply to 2 jobs..."
  value={taskText}
  onChange={(e) => setTaskText(e.target.value)}
/>

    </div>
  );
}
