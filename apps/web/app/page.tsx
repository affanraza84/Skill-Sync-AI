import { Button } from "@skillsync/ui";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        
        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-indigo-300 backdrop-blur-md transition-colors hover:bg-white/10 cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse" />
          Powered by Google Gemini 1.5
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 mb-6 drop-shadow-sm">
          Navigate Your Career with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
            Absolute Clarity
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl font-light leading-relaxed">
          SkillSync AI analyzes your unique skills, uncovers hidden career paths, and generates a personalized, week-by-week roadmap to help you land your dream job.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/profile" className="w-full sm:w-auto">
            <button className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-500 hover:shadow-[0_0_40px_8px_rgba(79,70,229,0.3)]">
              <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:-translate-x-4">
                →
              </span>
              <span className="transition-transform duration-300 group-hover:-translate-x-4">
                Start Free Analysis
              </span>
            </button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <button className="w-full inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:scale-105">
              View Dashboard
            </button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          
          <div className="flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Smart Matching</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Advanced AI models instantly map your existing skills to the most lucrative and rewarding career paths.</p>
          </div>

          <div className="flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Gap Detection</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Pinpoint exactly which skills you are missing to land the job you want, prioritized by market demand.</p>
          </div>

          <div className="flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Actionable Roadmaps</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Get a step-by-step, week-by-week customized learning plan to bridge your gaps and reach your goals.</p>
          </div>

        </div>
      </div>
    </main>
  );
}
