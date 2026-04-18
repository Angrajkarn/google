"use client";

import React, { useState } from "react";

const FanPulse = () => {
  const [pulses, setPulses] = useState<{ id: number; type: string }[]>([]);

  const addPulse = (type: string) => {
    const id = Date.now();
    setPulses((prev) => [...prev, { id, type }]);
    setTimeout(() => {
      setPulses((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  };

  return (
    <div className="glass p-6 w-full max-w-sm flex flex-col items-center">
      <h4 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">Team Pulse</h4>
      
      <div className="flex gap-4">
        <button 
          onClick={() => addPulse("fire")}
          className="w-16 h-16 rounded-full glass-dark flex items-center justify-center text-2xl hover:scale-110 transition-transform active:scale-95"
          title="Great Boundary!"
        >
          🔥
        </button>
        <button 
          onClick={() => addPulse("wicket")}
          className="w-16 h-16 rounded-full glass-dark flex items-center justify-center text-2xl hover:scale-110 transition-transform active:scale-95"
          title="OUT!"
        >
          ☝🏽
        </button>
        <button 
          onClick={() => addPulse("shock")}
          className="w-16 h-16 rounded-full glass-dark flex items-center justify-center text-2xl hover:scale-110 transition-transform active:scale-95"
          title="What a ball!"
        >
          😱
        </button>
      </div>

      <div className="h-20 w-full relative mt-8 flex justify-center overflow-hidden">
        {pulses.map((p) => (
          <div 
            key={p.id}
            className="absolute bottom-0 text-3xl animate-bounce-up"
            style={{ 
              left: `${Math.random() * 80 + 10}%`,
              animation: "pulse-rise 1s ease-out forwards"
            }}
          >
            {p.type === "fire" ? "🔥" : p.type === "wicket" ? "☝🏽" : "😱"}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse-rise {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FanPulse;
