import { useState } from "react";

export default function QuestionCard({ q, onUpdate }) {
    const [answer, setAnswer] = useState(q.answer || "");
  
    const submitAnswer = async () => {
      await fetch(`http://localhost:5000/api/questions/${q._id}/answer`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      onUpdate();
    };
  
    return (
      <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
        <p className="text-white/90 font-semibold">Q: {q.question}</p>
        {q.answer ? (
          <p className="text-green-400 mt-2">A: {q.answer}</p>
        ) : (
          <div className="mt-2">
            <textarea
              className="w-full bg-transparent border border-white/20 p-2 rounded resize-none"
              rows={2}
              placeholder="Write an answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              onClick={submitAnswer}
              className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Answer
            </button>
          </div>
        )}
      </div>
    );
  }
  