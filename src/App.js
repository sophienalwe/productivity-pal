// src/App.js
import React, { useState } from "react";
import TaskInput        from "./components/TaskInput";
import EnergySelector   from "./components/EnergySelector";
import OutputDisplay    from "./components/OutputDisplay";
import MotivationButton from "./components/MotivationButton";
import "./App.css";

function App() {
  const [taskText, setTaskText] = useState("");
  const [energy, setEnergy]   = useState("medium");
  const [plan, setPlan]       = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!taskText.trim()) {
      setPlan("Please enter a task.");
      return;
    }

    setLoading(true);
    setPlan("");

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

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans text-gray-800">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
          Productivity Pal
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Let’s build your plan based on your energy
        </p>

        {/* Big textarea input */}
        <TaskInput taskText={taskText} setTaskText={setTaskText} />

        {/* Energy radio buttons */}
        <div className="my-4">
          <EnergySelector energy={energy} setEnergy={setEnergy} />
        </div>

        {/* Generate button */}
        <button
          onClick={generatePlan}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mb-4 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Get My Plan"}
        </button>

        {/* “I feel overwhelmed” helper link */}
        <MotivationButton />

        {/* Where the AI result lands */}
        <OutputDisplay plan={plan} />
      </div>
    </div>
  );
}

export default App;
