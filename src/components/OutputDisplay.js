// src/components/OutputDisplay.js
import React from "react";

export default function OutputDisplay({ plan }) {
  if (!plan) return null;

  return (
    <div className="mt-8 bg-gradient-to-br from-indigo-50/50 to-pink-50/30 dark:from-slate-900/50 dark:to-slate-900/30 border border-indigo-100/40 dark:border-slate-800 rounded-2xl p-6 shadow-sm shadow-indigo-100/10 animate-fade-in transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">✨</span>
        <h3 className="text-base font-bold tracking-wide uppercase text-indigo-600 dark:text-indigo-400">
          Your Personalized Blueprint
        </h3>
      </div>
      
      {/* whitespace-pre-wrap ensures the AI's line breaks look perfect */}
      <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-wrap space-y-3 font-medium">
        {plan}
      </div>
    </div>
  );
}
