// src/components/TaskInput.js
import React from "react";

export default function TaskInput({ taskText, setTaskText }) {
  return (
    <div className="mb-6">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
        What's weighing on your mind today?
      </label>
      
      <div className="relative w-full">
        <textarea
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="e.g., Finish my software engineering project, clear out my inbox, and clean my room, but I'm feeling totally frozen..."
          rows="4"
          // We removed max-w-md so it stretches perfectly to fit the full width of your card container
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all duration-300 shadow-inner resize-none"
        />
        
        {/* Soft, minimal character tracking counter for a high-end UI finish */}
        <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 dark:text-slate-600 font-mono select-none pointer-events-none">
          {taskText.length} characters
        </div>
      </div>
    </div>
  );
}