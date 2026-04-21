"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@skillsync/ui";
import { useCareerStore } from "../../lib/store";
import { useRouter } from "next/navigation";
import { createUser } from "../../lib/api";
import { useState } from "react";

const profileSchema = z.object({
  email: z.string().email("Invalid email address"),
  skills: z.string().min(2, "Required"),
  interests: z.string().min(2, "Required"),
  education: z.string().min(2, "Required"),
  goals: z.string().min(2, "Required"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const setProfile = useCareerStore((state) => state.setProfile);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: ProfileForm) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const formattedData = {
        email: data.email,
        skills: data.skills.split(",").map(s => s.trim()),
        interests: data.interests.split(",").map(s => s.trim()),
        education: data.education,
        goals: data.goals,
      };
      
      // Call Backend API
      await createUser(formattedData);

      // Save to Zustand and Redirect
      setProfile(formattedData);
      router.push("/analysis");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A0A0A] text-white flex items-center justify-center p-8 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-3">
            Build Your Profile
          </h1>
          <p className="text-slate-400">Tell us about your skills and goals to generate your personalized roadmap.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/5 p-8 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
          
          {errorMsg && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">{errorMsg}</div>}

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Email Address</label>
            <input 
              type="email"
              {...register("email")} 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Skills (comma separated)</label>
            <input 
              {...register("skills")} 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              placeholder="e.g. React, Python, Product Management"
            />
            {errors.skills && <p className="text-red-400 text-sm">{errors.skills.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Interests</label>
            <input 
              {...register("interests")} 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              placeholder="e.g. AI, Startups, Finance"
            />
            {errors.interests && <p className="text-red-400 text-sm">{errors.interests.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Education</label>
            <input 
              {...register("education")} 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              placeholder="e.g. BS Computer Science"
            />
            {errors.education && <p className="text-red-400 text-sm">{errors.education.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Career Goals</label>
            <textarea 
              {...register("goals")} 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all min-h-[120px] resize-none"
              placeholder="e.g. Become a Senior Full-Stack Engineer in 3 years"
            />
            {errors.goals && <p className="text-red-400 text-sm">{errors.goals.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-4 group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_30px_5px_rgba(79,70,229,0.3)] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Saving & Analyzing...
              </span>
            ) : "Save & Analyze"}
          </button>
        </form>
      </div>
    </div>
  );
}
