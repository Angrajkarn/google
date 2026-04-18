import ScoreBoard from "@/components/ScoreBoard";
import ChatAgent from "@/components/ChatAgent";
import FanPulse from "@/components/FanPulse";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 md:px-8">
      {/* Header section */}
      <header className="text-center mb-12">
        <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 animate-pulse">
          Google Cloud Build with AI
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-white via-slate-300 to-primary bg-clip-text text-transparent">
          Agentic Premier League
        </h1>
        <p className="mt-4 text-slate-400 max-w-lg mx-auto text-lg">
          Experience the match like never before with your personal AI-driven fan hub.
        </p>
      </header>

      {/* Main Grid */}
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Stats & Pulse */}
        <div className="lg:col-span-7 flex flex-col gap-8 items-center lg:items-start">
          <ScoreBoard />
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-6">
              <h3 className="font-bold mb-4 text-slate-200">Match Insights</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  Last 5 overs: <span className="text-white">42 runs, 1 wicket</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Projected Score: <span className="text-white">188</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Bowling form: <span className="text-white">Siraj (2/24)</span>
                </li>
              </ul>
            </div>
            <FanPulse />
          </div>
        </div>

        {/* Right Column: AI Assistant */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <ChatAgent />
        </div>

      </main>

      {/* Footer / Status segment */}
      <footer className="mt-20 py-8 border-t border-white/5 w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
        <p>© 2026 Agentic Premier League Fan Hub • Powered by Gemini 1.5 Flash</p>
        <div className="flex gap-6">
          <span className="hover:text-primary transition-colors cursor-pointer">Live Stream</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Leaderboard</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Team Data</span>
        </div>
      </footer>
    </div>
  );
}
