import React, { useEffect, useState } from "react";
import QuestionForm from "../components/QuestionForm";
import QuestionCard from "../components/QuestionCard";
import StatsBox from "../components/StatsBox";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState({ total: 0, answered: 0, unanswered: 0 });

  const fetchQuestions = async () => {
    const res = await fetch(`${API}/questions`);
    const data = await res.json();
    setQuestions(data);
  };

  const fetchStats = async () => {
    const res = await fetch(`${API}/stats`);
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchQuestions();
    fetchStats();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ask Me Anything 💬</h1>

      <StatsBox stats={stats} />

      <QuestionForm onSubmit={fetchQuestions} />

      <div className="mt-8 space-y-4">
        {questions.map((q) => (
          <QuestionCard key={q._id} q={q} onUpdate={fetchQuestions} />
        ))}
      </div>
    </div>
  );
}
