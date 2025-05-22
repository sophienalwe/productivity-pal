// src/App.js
import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import TaskInput from "./components/TaskInput";
import EnergySelector from "./components/EnergySelector";
import OutputDisplay from "./components/OutputDisplay";
import MotivationButton from "./components/MotivationButton";

// 🎯 Returns a motivational quote based on energy level
const getMotivationalQuote = (energy) => {
  const quotes = {
    low: [
      "Small steps are still steps. Keep going 💪",
      "Rest is productive too. One thing at a time 💤",
      "You don’t have to do it all — just start 🌱",
    ],
    medium: [
      "You’re doing better than you think 🌤️",
      "Progress is progress — stay steady 🛤️",
      "Keep showing up for yourself ✨",
    ],
    high: [
      "Let’s get it! You’re on fire 🔥",
      "Channel that energy — you’re unstoppable 💥",
      "Now’s your moment. Go crush it 💯",
    ],
  };

  const pool = quotes[energy] || quotes.medium;
  return pool[Math.floor(Math.random() * pool.length)];
};

// 🎯 Suggests a break idea based on energy level
const getBreakSuggestion = (energy) => {
  const breaks = {
    low: ["Take a 5-min nap 😴", "Light stretching 🧘‍♀️", "Listen to calming music 🎧"],
    medium: ["Go for a walk 🚶‍♀️", "Have a snack 🥨", "Do a 10-min yoga flow 🧘‍♂️"],
    high: ["Dance it out 💃", "Short workout 💪", "Tidy your space ✨"],
  };

  const options = breaks[energy] || breaks.medium;
  return options[Math.floor(Math.random() * options.length)];
};

function App() {
  // 🧠 App state
  const [taskText, setTaskText] = useState("");
  const [energy, setEnergy] = useState("medium");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");
  const [breakSuggestion, setBreakSuggestion] = useState("");

  // 💾 Load saved task & energy from localStorage on mount
  useEffect(() => {
    const savedTask = localStorage.getItem("taskText");
    const savedEnergy = localStorage.getItem("energy");
    if (savedTask) setTaskText(savedTask);
    if (savedEnergy) setEnergy(savedEnergy);
  }, []);

  // 💾 Auto-save task text & energy level
  useEffect(() => {
    localStorage.setItem("taskText", taskText);
  }, [taskText]);

  useEffect(() => {
    localStorage.setItem("energy", energy);
  }, [energy]);

  // 🌗 Apply theme preference (light/dark) on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // 🌗 Toggle light/dark theme
  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // 🖨️ Ref + handler for PDF export
  const planRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => planRef.current,
  });

  // ✨ Generate plan using OpenAI
  const generatePlan = async () => {
    if (!taskText.trim()) {
      setPlan("Please enter a task.");
      return;
    }

    setLoading(true);
    setPlan("");
    setQuote(getMotivationalQuote(energy));
    setBreakSuggestion(getBreakSuggestion(energy));

    const prompt = `The user has this energy level: ${energy}.
Here is what they need to do today: ${taskText}.
Suggest a gentle, prioritized plan to help them stay productive but not overwhelmed.`;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);

      const data = await res.json();
      setPlan(data.choices?.[0]?.message?.content ?? "No plan returned.");
    } catch (err) {
      console.error(err);
      setPlan("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 UI Layout
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
        {/* Header & theme toggle */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            Productivity Pal
          </h1>
          <button
            onClick={toggleTheme}
            className="text-sm px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Toggle Theme 🌗
          </button>
        </div>

        {/* Intro */}
        <p className="text-center text-gray-600 dark:text-gray-300">
          Let’s build your plan based on your energy
        </p>

        {/* Input + Energy Selector */}
        <TaskInput taskText={taskText} setTaskText={setTaskText} />
        <EnergySelector energy={energy} setEnergy={setEnergy} />

        {/* Buttons */}
        <div className="flex gap-3 items-center justify-between">
          <button
            onClick={generatePlan}
            disabled={loading}
            className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium w-full disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                Thinking...
              </>
            ) : (
              "Get My Plan"
            )}
          </button>
          <MotivationButton />
        </div>

        {/* Motivational quote */}
        {quote && (
          <div className="bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 px-4 py-3 rounded-md shadow text-sm">
            {quote}
          </div>
        )}

        {/* AI-generated plan */}
        {plan && (
          <>
            <div
              ref={planRef}
              className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner space-y-2"
            >
              <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                Your Personalized Plan:
              </h2>
              <p className="whitespace-pre-line text-sm text-gray-700 dark:text-gray-100">
                {plan}
              </p>
            </div>

            {/* Break suggestion */}
            {breakSuggestion && (
              <div className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 px-4 py-3 rounded-md shadow text-sm mt-2">
                Break Idea: {breakSuggestion}
              </div>
            )}

            {/* Export button */}
            <button
              onClick={handlePrint}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Export as PDF 📄
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
