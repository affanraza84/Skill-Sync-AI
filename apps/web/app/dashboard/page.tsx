"use client";

import { Button } from "@skillsync/ui";
import Link from "next/link";
import { useCareerStore } from "../../lib/store";

export default function DashboardPage() {
  const profile = useCareerStore((state) => state.profile);
  const analysisResult = useCareerStore((state) => state.analysisResult);

  // Stats calculation
  const totalSkills = profile?.skills?.length || 0;
  const matchCount = analysisResult?.careers?.length || 0;
  const gapCount = analysisResult?.skillGaps?.length || 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A0A0A] text-white relative overflow-hidden pb-24">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto p-6 md:p-10 relative z-10 animate-fade-in-up">
        
        {/* Header & High-Level Stats */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400">
                Intelligence Dashboard
              </h1>
              <p className="text-slate-400 mt-3 text-lg font-light">Your personalized career roadmap and skill gap analysis.</p>
            </div>
            <Link href="/profile">
              <button className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-0.5">
                Update Profile
              </button>
            </Link>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-4 mt-8">
             <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center">
               <span className="text-3xl font-display font-bold text-indigo-400">{matchCount}</span>
               <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Paths Found</span>
             </div>
             <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center">
               <span className="text-3xl font-display font-bold text-orange-400">{gapCount}</span>
               <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Skill Gaps</span>
             </div>
             <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center">
               <span className="text-3xl font-display font-bold text-cyan-400">{totalSkills}</span>
               <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Tracked Skills</span>
             </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* ---------------- LEFT COLUMN (Main Content) ---------------- */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* --- CAREERS SECTION --- */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold flex items-center gap-3 text-white">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.15)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  Top Career Matches
                </h2>
                {!analysisResult && (
                  <Link href="/analysis">
                    <button className="rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-4 py-2 text-sm font-medium hover:bg-indigo-600 hover:text-white transition-all">
                      Run Analysis
                    </button>
                  </Link>
                )}
              </div>

              {!analysisResult ? (
                // EMPTY STATE
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-10 text-center flex flex-col items-center justify-center min-h-[300px] group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 opacity-50" />
                  
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(79,70,229,0.2)] border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-white mb-2 relative z-10">Intelligence Awaiting</h3>
                  <p className="text-slate-400 mb-8 max-w-sm mx-auto relative z-10">We need your profile data to generate personalized career insights and skill roadmaps.</p>
                  
                  <Link href="/analysis" className="relative z-10">
                    <button className="inline-flex items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-8 py-3.5 font-medium text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_20px_4px_rgba(79,70,229,0.3)] hover:-translate-y-1">
                      Start Engine
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {analysisResult.careers?.map((match: any, idx: number) => (
                    <div key={idx} className="relative overflow-hidden p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] hover:-translate-y-1">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 relative z-10">
                        <div>
                          <h3 className="font-display font-bold text-2xl text-white group-hover:text-indigo-300 transition-colors">{match.role}</h3>
                          <div className="flex gap-2 mt-2">
                             <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border text-slate-300 border-white/10 bg-white/5">
                               {analysisResult.domain}
                             </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.15)] shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                          <span className="text-indigo-200 text-sm font-bold tracking-wider">
                            {match.score}% MATCH
                          </span>
                        </div>
                      </div>
                      
                      {(match.reason || match.description) && (
                        <p className="text-slate-400 leading-relaxed text-sm relative z-10 border-t border-white/5 pt-4">
                          {match.reason || match.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* --- ROADMAP SECTION --- */}
            {analysisResult && analysisResult.roadmap && analysisResult.roadmap.length > 0 && (
              <section className="pt-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-2xl font-bold flex items-center gap-3 text-white">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                    </div>
                    Execution Timeline
                  </h2>
                </div>
                
                <div className="relative pl-4 md:pl-0">
                  {/* Vertical Line */}
                  <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent -translate-x-1/2 hidden md:block" />
                  <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent md:hidden" />

                  <div className="space-y-6">
                    {analysisResult.roadmap.map((step: any, idx: number) => (
                      <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-6 group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* Center Node */}
                        <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-[#0A0A0A] border-4 border-[#0A0A0A] z-10">
                           <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:bg-cyan-500/40 group-hover:scale-110 transition-all">
                              <span className="text-cyan-300 font-bold text-sm">{step.step || step.week}</span>
                           </div>
                        </div>

                        {/* Content Card */}
                        <div className="w-full md:w-1/2 pl-16 md:pl-0">
                           <div className={`p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all shadow-lg ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                             {step.timeline && (
                               <p className="text-cyan-400 text-xs font-bold tracking-wider uppercase mb-2">
                                 {step.timeline}
                               </p>
                             )}
                             <p className="text-slate-200 font-medium leading-relaxed">{step.task}</p>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

          </div>

          {/* ---------------- RIGHT COLUMN (Sidebar) ---------------- */}
          <div className="space-y-8">
            
            {/* --- SKILLS SECTION --- */}
            <section className="bg-white/[0.02] p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl">
              <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-3 text-white">
                <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                Tracked Skills
              </h2>
              
              {!profile || !profile.skills || profile.skills.length === 0 ? (
                <div className="p-4 bg-black/20 rounded-xl border border-white/5 text-center">
                  <p className="text-sm text-slate-500 italic">No skills registered.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {profile.skills.map((skill: string, idx: number) => {
                    // Generate pseudo-random colors based on string length to make it colorful
                    const colors = [
                      "bg-blue-500/10 text-blue-300 border-blue-500/20",
                      "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
                      "bg-purple-500/10 text-purple-300 border-purple-500/20",
                      "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
                      "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                    ];
                    const colorClass = colors[skill.length % colors.length];

                    return (
                      <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-medium border backdrop-blur-sm ${colorClass}`}>
                        {skill}
                      </span>
                    )
                  })}
                </div>
              )}
            </section>

            {/* --- GAPS SECTION --- */}
            {analysisResult && analysisResult.skillGaps && analysisResult.skillGaps.length > 0 && (
              <section className="bg-white/[0.02] p-8 rounded-3xl border border-orange-500/20 backdrop-blur-xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[60px] pointer-events-none group-hover:bg-orange-500/20 transition-colors duration-700" />
                
                <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-3 text-white relative z-10">
                  <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  Identified Gaps
                </h2>
                
                <ul className="space-y-4 relative z-10">
                  {analysisResult.skillGaps.map((gap: any, idx: number) => {
                    const isHigh = gap.priority === 'HIGH';
                    const isMedium = gap.priority === 'MEDIUM';
                    
                    return (
                      <li key={idx} className="flex flex-col p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            {/* Glowing Dot Indicator */}
                            <div className="relative flex h-2.5 w-2.5">
                              {isHigh && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>}
                              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isHigh ? 'bg-orange-500' : isMedium ? 'bg-yellow-500' : 'bg-slate-400'}`}></span>
                            </div>
                            <span className="text-sm font-semibold text-slate-200">{gap.skill}</span>
                          </div>
                          
                          <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${isHigh ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' : isMedium ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' : 'text-slate-400 border-slate-500/30 bg-slate-500/10'}`}>
                            {gap.priority}
                          </span>
                        </div>
                        
                        {gap.reason && (
                          <p className="text-xs text-slate-400 leading-relaxed pl-4.5 mt-1 border-l-2 border-white/5 ml-1">{gap.reason}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
