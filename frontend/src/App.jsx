import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="backdrop-blur-md bg-white/5 min-h-screen">
        <Home />
      </div>
    </div>
  );
}

export default App;
