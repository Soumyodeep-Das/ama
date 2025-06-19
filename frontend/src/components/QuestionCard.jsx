import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function QuestionCard({ q, onUpdate }) {
  const [answer, setAnswer] = useState(q.answer || "");

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    await fetch(`${API}/questions/${q._id}/answer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });
    onUpdate();
  };

  const deleteQuestion = async () => {
    await fetch(`${API}/questions/${q._id}`, {
      method: "DELETE",
    });
    onUpdate();
  };

  return (
    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md shadow-md">
      <p className="text-white/90 font-semibold">Q: {q.question}</p>

      {q.answer ? (
        <div className="mt-2 flex flex-col gap-3">
          <p className="text-green-300">A: {q.answer}</p>
          <button
            onClick={deleteQuestion}
            className="self-start px-4 py-1.5 bg-white/10 text-red-400 rounded-md border border-white/20 transition-all cursor-pointer hover:text-red-200 hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <textarea
            className="w-full bg-transparent border border-white/20 p-2 rounded resize-none text-white placeholder:text-white/40"
            rows={2}
            placeholder="Write an answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={submitAnswer}
              className="px-4 py-1.5 bg-white/10 text-green-300 rounded-md border border-white/20 transition-all cursor-pointer hover:text-green-200 hover:bg-green-500/10"
            >
              Submit Answer
            </button>
            <button
              onClick={deleteQuestion}
              className="px-4 py-1.5 bg-white/10 text-red-400 rounded-md border border-white/20 transition-all cursor-pointer hover:text-red-200 hover:bg-red-500/10"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
