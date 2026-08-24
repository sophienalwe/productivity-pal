export default function EnergySelector({ energy, setEnergy }) {
  return (
    <div className="mb-6">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
        How's your energy right now?
      </label>
      <div className="grid grid-cols-3 gap-3">
        {["low", "medium", "high"].map((level) => {
          const isActive = energy === level;
          
          // Custom design variables based on active selection states
          const moodStyles = {
            low: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400 shadow-sm shadow-amber-500/5",
            medium: "bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-400 shadow-sm shadow-indigo-500/5",
            high: "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400 shadow-sm shadow-rose-500/5",
          };

          return (
            <label
              key={level}
              className={`relative flex flex-col items-center justify-center py-3.5 px-4 rounded-2xl border text-center cursor-pointer select-none transition-all duration-300 font-medium text-sm
                ${isActive 
                  ? `${moodStyles[level]} scale-[1.02] border-2 font-bold` 
                  : "border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                }
              `}
            >
              <input
                type="radio"
                value={level}
                checked={isActive}
                onChange={(e) => setEnergy(e.target.value)}
                className="sr-only" // This utility hides the raw native browser circle completely!
              />
              <span className="capitalize tracking-wide">
                {level === "low" && "🥱 "}
                {level === "medium" && "☕ "}
                {level === "high" && "⚡ "}
                {level}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}