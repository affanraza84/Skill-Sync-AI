"use client";

import { useEffect, useState, useRef } from "react";
import { useCareerStore } from "../../lib/store";
import { Button } from "@skillsync/ui";
import Link from "next/link";
import { analyzeProfile } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const profile = useCareerStore((state) => state.profile);
  const setAnalysisResult = useCareerStore((state) => state.setAnalysisResult);
  const [error, setError] = useState("");
  const router = useRouter();
  
  // Use a ref to prevent double-fetching in React Strict Mode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!profile || hasFetched.current) return;
    hasFetched.current = true;
    
    async function fetchAnalysis() {
      try {
        const result = await analyzeProfile(profile);
        setAnalysisResult(result.data);
        // Add a slight delay just so the user sees the cool loading screen briefly
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchAnalysis();
  }, [profile, router, setAnalysisResult]);

  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#0A0A0A] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden text-white">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md max-w-md w-full">
          <p className="mb-6 text-slate-400">Please fill out your profile first.</p>
          <Link href="/profile">
            <button className="w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-indigo-500">
              Go to Profile
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#0A0A0A] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden text-white">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl max-w-lg w-full backdrop-blur-md shadow-[0_0_40px_rgba(239,68,68,0.1)]">
          <h2 className="text-2xl font-bold mb-3 text-red-400">Analysis Failed</h2>
          <p className="mb-8 text-slate-300">{error}</p>
          <Link href="/profile">
            <button className="w-full inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-white/20">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden text-white">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-indigo-600/20 blur-[150px] animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-md w-full">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4">
          Analyzing Your Profile
        </h1>
        <p className="text-slate-400 mb-16 text-lg">Our AI is crunching the numbers to find your perfect career path...</p>
        
        {/* Modern Spinner */}
        <div className="relative w-32 h-32 mx-auto mb-16">
          {/* Inner ring */}
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          {/* Outer animated ring */}
          <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(99,102,241,0.5)]"></div>
          
          {/* Center glowing orb */}
          <div className="absolute inset-4 bg-indigo-500/20 rounded-full blur-md animate-pulse"></div>
        </div>
        
        <div className="space-y-4 text-sm font-medium text-indigo-300">
          <p className="animate-[pulse_1.5s_ease-in-out_infinite]">Matching skills across 10,000+ roles...</p>
          <p className="animate-[pulse_1.5s_ease-in-out_0.5s_infinite]">Identifying high-impact skill gaps...</p>
          <p className="animate-[pulse_1.5s_ease-in-out_1s_infinite]">Building week-by-week learning roadmap...</p>
        </div>
      </div>
    </div>
  );
}
