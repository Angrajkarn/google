"use client";

import React, { useState, useEffect } from "react";
import { getGeminiResponse } from "@/lib/gemini";
import { fetchIPLMatches, MatchData } from "@/lib/cricketApi";

const ChatAgent = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "I'm checking the live scores... Ready to discuss the game!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [matchContext, setMatchContext] = useState<string>("");

  useEffect(() => {
    const updateContext = async () => {
      const matches = await fetchIPLMatches();
      if (matches.length > 0) {
        const liveMatch = matches[0];
        setMatchContext(`IPL Match: ${liveMatch.team1} vs ${liveMatch.team2}. Current status: ${liveMatch.status}. Scores: ${liveMatch.team1} (${liveMatch.score1}), ${liveMatch.team2} (${liveMatch.score2}).`);
      } else {
        setMatchContext("No live IPL matches currently.");
      }
    };
    updateContext();
    const interval = setInterval(updateContext, 60000); // Update context every minute
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await getGeminiResponse(input, matchContext);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection to the Match Center timed out. Let's try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass max-h-[600px] flex flex-col w-full max-w-lg">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-blink"></span>
          Match Companion
        </h3>
        <span className="text-xs text-slate-400">Powered by Gemini</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.role === "user" 
                ? "bg-primary text-white" 
                : "glass-dark text-slate-200"
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass-dark p-3 rounded-2xl flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-slate-900/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about live match context..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-primary hover:bg-primary/80 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all transform active:scale-95"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAgent;
