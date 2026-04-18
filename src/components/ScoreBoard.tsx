"use client";

import React, { useState, useEffect } from "react";

const ScoreBoard = () => {
  const [score, setScore] = useState(145);
  const [wickets, setWickets] = useState(3);
  const [overs, setOvers] = useState(16.4);

  // Mock live updates
  useEffect(() => {
    const timer = setInterval(() => {
      setScore((prev) => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass p-8 w-full max-w-2xl animate-float">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary pulse-glow flex items-center justify-center font-bold">
            RCB
          </div>
          <span className="text-xl font-semibold text-slate-400">vs</span>
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold">
            CSK
          </div>
        </div>
        <div className="text-sm font-mono text-primary animate-pulse">LIVE • INNINGS 1</div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-7xl font-bold tracking-tighter mb-2">
          {score} <span className="text-primary">/ {wickets}</span>
        </h1>
        <p className="text-xl text-slate-400 font-medium">
          Overs <span className="text-white">{overs}</span>
        </p>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="glass-dark p-3 rounded-xl">
          <p className="text-xs text-slate-400 uppercase">Run Rate</p>
          <p className="text-lg font-bold">8.70</p>
        </div>
        <div className="glass-dark p-3 rounded-xl">
          <p className="text-xs text-slate-400 uppercase">Target</p>
          <p className="text-lg font-bold">---</p>
        </div>
        <div className="glass-dark p-3 rounded-xl border-accent/20">
          <p className="text-xs text-accent uppercase">Win Prob</p>
          <p className="text-lg font-bold">58%</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
