import React, { useState } from 'react';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="text-4xl animate-ping absolute ml-20">✨</div>
          <div className="text-5xl animate-pulse absolute -ml-20 mt-10">🥳</div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎉 Tailwind Test
          </h1>

          <p className="text-green-600 font-semibold mb-1">
            ✓ Green text with semibold weight
          </p>
          <p className="text-red-600 font-medium mb-4">
            ✓ Red text with medium weight
          </p>

          <div className="flex gap-4 justify-center mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
          </div>

          <button
            onClick={handleConfetti}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mb-3"
          >
            Click for Confetti!
          </button>

          <button className="w-full border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold py-3 px-4 rounded-lg transition-all duration-200">
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;