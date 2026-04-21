"use client";

import { Button } from "@skillsync/ui";
import Link from "next/link";
import { useCareerStore } from "../../lib/store";

export default function DashboardPage() {
  const profile = useCareerStore((state) => state.profile);
  const analysisResult = useCareerStore((state) => state.analysisResult);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A0A0A] text-white relative overflow-hidden pb-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        <header className="flex items-center justify-between py-8 border-b border-white/10 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Intelligence Dashboard
            </h1>
            <p className="text-slate-400 mt-2">Your personalized career roadmap and skill gap analysis.</p>
          </div>
          <Link href="/profile">
            <button className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:scale-105">
              Update Profile
            </button>
          </Link>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Careers Section */}
            <section className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </span>
                    Top Career Matches
                  </h2>
                  {analysisResult && analysisResult.domain && (
                    <div className="ml-12 mt-1">
                      <p className="text-indigo-400 text-sm font-medium">Primary Domain: {analysisResult.domain}</p>
                      {analysisResult.subdomains && analysisResult.subdomains.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {analysisResult.subdomains.map((sd: string, i: number) => (
                            <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                              {sd}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {!analysisResult && (
                  <Link href="/analysis">
                    <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 transition-colors">
                      Run AI Analysis
                    </button>
                  </Link>
                )}
              </div>

              {!analysisResult ? (
                <div className="text-center py-16 bg-black/20 rounded-2xl border border-white/5 border-dashed">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <p className="text-slate-400 mb-6 text-lg">You haven't run a recent analysis.</p>
                  <Link href="/analysis">
                    <button className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                      Analyze My Profile
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 relative z-10">
                  {analysisResult.careers?.map((match: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group/card">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                        <h3 className="font-bold text-xl text-white group-hover/card:text-indigo-300 transition-colors">{match.role}</h3>
                        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
                          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                          <span className="text-indigo-300 text-sm font-bold tracking-wide">
                            {match.score}% MATCH
                          </span>
                        </div>
                      </div>
                      {(match.reason || match.description) && (
                        <p className="text-slate-400 leading-relaxed text-sm">
                          {match.reason || match.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Roadmap Section */}
            {analysisResult && analysisResult.roadmap && analysisResult.roadmap.length > 0 && (
              <section className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
                  <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  </span>
                  Your Action Plan
                </h2>
                
                <div className="space-y-4 relative z-10">
                  {analysisResult.roadmap.map((step: any, idx: number) => (
                    <div key={idx} className="flex gap-5 p-5 rounded-2xl bg-black/40 border border-white/5 hover:bg-white/5 transition-colors">
                      <div className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold h-12 w-12 flex items-center justify-center rounded-xl shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex-col">
                        <span className="text-xs font-normal opacity-70 leading-none mb-1">STEP</span>
                        <span className="leading-none">{step.step || step.week}</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-slate-300 font-medium">{step.task}</p>
                        {step.timeline && (
                          <p className="text-cyan-500/70 text-xs mt-1.5 font-semibold tracking-wider uppercase">
                            ⏱ {step.timeline}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            
            <section className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Profile Skills
              </h2>
              {!profile || !profile.skills || profile.skills.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No skills added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="bg-white/10 text-slate-200 px-3.5 py-1.5 rounded-lg text-sm border border-white/5 backdrop-blur-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {analysisResult && analysisResult.skillGaps && analysisResult.skillGaps.length > 0 && (
              <section className="bg-white/5 p-8 rounded-3xl border border-orange-500/20 backdrop-blur-xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] pointer-events-none" />
                <h2 className="text-xl font-bold mb-6 text-orange-400 flex items-center gap-2 relative z-10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Identified Gaps
                </h2>
                <ul className="space-y-5 relative z-10">
                  {analysisResult.skillGaps.map((gap: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/30 transition-colors">
                      <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${gap.priority === 'HIGH' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : gap.priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-slate-400'}`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-semibold text-white">{gap.skill}</p>
                          <p className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${gap.priority === 'HIGH' ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' : gap.priority === 'MEDIUM' ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' : 'text-slate-400 border-slate-500/30 bg-slate-500/10'}`}>
                            {gap.priority}
                          </p>
                        </div>
                        {gap.reason && (
                          <p className="text-xs text-slate-400 leading-relaxed mt-2">{gap.reason}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
