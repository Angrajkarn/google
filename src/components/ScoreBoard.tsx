"use client";

import React, { useState, useEffect } from "react";
import { fetchIPLMatches, MatchData } from "@/lib/cricketApi";

const ScoreBoard = () => {
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadData = async () => {
    const data = await fetchIPLMatches();
    setMatches(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="glass p-8 w-full max-w-2xl animate-pulse flex justify-center items-center">
        <span className="text-slate-400">Syncing with Pitch...</span>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="glass p-8 w-full max-w-2xl text-center">
        <div className="text-primary text-xs font-bold tracking-widest mb-4">MATCH ADVISORY</div>
        <h2 className="text-2xl font-bold mb-2">No Live IPL Matches</h2>
        <p className="text-slate-400 text-sm">Stay tuned for the next high-voltage encounter!</p>
      </div>
    );
  }

  const match = matches[currentIndex];

  return (
    <div className="glass p-8 w-full max-w-2xl animate-float">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase">
            {match.series}
          </div>
        </div>
        <div className="text-sm font-mono text-primary animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
          LIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">{match.team1}</p>
          <h2 className="text-4xl font-bold">{match.score1}</h2>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">{match.team2}</p>
          <h2 className="text-4xl font-bold">{match.score2}</h2>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-sm text-accent font-medium">{match.status}</p>
      </div>

      {matches.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {matches.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-6' : 'bg-slate-700 hover:bg-slate-600'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
