import React, { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function QuestionForm({ onSubmit }) {
    const [question, setQuestion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${API}/questions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        });
        setQuestion("");
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white/20 p-6 rounded-2xl shadow-lg backdrop-blur-lg border border-white/20">
            <textarea
                className="w-full bg-transparent border border-white/30 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner text-base placeholder:text-white/60 transition"
                rows={3}
                placeholder="Ask an anonymous question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button
                type="submit"
                className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all cursor-pointer"
            >
                <span>Submit</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </button>

        </form>
    );
}
