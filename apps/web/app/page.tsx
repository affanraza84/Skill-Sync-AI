import { Button } from "@skillsync/ui";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-[#0A0A0A]">
      
      {/* ------------------- HERO SECTION ------------------- */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between px-6 pt-32 pb-20 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)]">
        {/* Background Decorative Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

        {/* Hero Text Content */}
        <div className="relative z-10 flex flex-col items-start text-left lg:w-1/2 lg:pr-12 animate-fade-in-up">
          <div className="mb-6 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-md transition-colors hover:bg-indigo-500/20 cursor-default shadow-[0_0_15px_rgba(79,70,229,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse" />
            Powered by Google Gemini 1.5
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400 mb-6 drop-shadow-sm leading-tight">
            Navigate Your Career with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
              Absolute Clarity
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl font-light leading-relaxed">
            SkillSync AI analyzes your unique skills, uncovers hidden career paths, and generates a personalized, week-by-week roadmap to help you land your dream job faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/profile" className="w-full sm:w-auto">
              <button className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-500 shadow-[0_0_20px_4px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_8px_rgba(79,70,229,0.4)]">
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
          
          <div className="mt-10 flex items-center gap-4 text-sm text-slate-500">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-slate-800 flex items-center justify-center text-[10px]">
                  👤
                </div>
              ))}
            </div>
            <p>Join 10,000+ professionals advancing their careers</p>
          </div>
        </div>

        {/* Hero Mockup Image */}
        <div className="relative mt-16 lg:mt-0 lg:w-1/2 flex justify-center items-center perspective-1000 animate-float">
          <div className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(79,70,229,0.5)] transform lg:-rotate-y-12 lg:rotate-x-12 transition-transform duration-700 hover:rotate-0">
            <Image 
              src="/images/dashboard-mockup.png" 
              alt="SkillSync AI Dashboard Mockup" 
              fill
              className="object-cover"
              priority
            />
            {/* Glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ------------------- HOW IT WORKS ------------------- */}
      <section className="relative py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white">How SkillSync Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">Four simple steps to transform your raw skills into a lucrative career path.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analyze Profile", desc: "Input your skills, interests, and past education into our engine." },
              { step: "02", title: "Domain Mapping", desc: "AI categorizes you into specific domains (Tech, Social, Commerce)." },
              { step: "03", title: "Discover Roles", desc: "Get matched with highly specific, non-generic career paths." },
              { step: "04", title: "Execute Roadmap", desc: "Follow a step-by-step weekly guide to bridge your skill gaps." }
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                <div className="text-5xl font-extrabold text-white/5 mb-6 group-hover:text-indigo-500/20 transition-colors">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                {/* Connecting Line (hidden on mobile) */}
                {idx !== 3 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-white/10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- FEATURES GRID ------------------- */}
      <section className="relative py-24 max-w-7xl mx-auto px-6 w-full text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white">Unmatched Career Intelligence</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">Everything you need to pivot gracefully or advance rapidly.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          <div className="group flex flex-col p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Hyper-Specific Matching</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Say goodbye to generic "Data Analyst" titles. We match you with roles like "Growth Analytics Manager" or "NLP Engineer".</p>
          </div>

          <div className="group flex flex-col p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm transition-all hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Dynamic Skill Gap Detection</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Pinpoint exactly which frameworks, soft skills, or certifications you are missing to land your target job.</p>
          </div>

          <div className="group flex flex-col p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Actionable Roadmaps</h3>
            <p className="text-slate-400 text-sm leading-relaxed">A week-by-week customized learning plan generated instantly. No more guessing what to study next.</p>
          </div>

        </div>
      </section>

      {/* ------------------- TESTIMONIALS ------------------- */}
      <section className="relative py-24 bg-indigo-950/10 border-y border-indigo-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-16 text-center text-white">Trusted by Career Changers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 relative">
              <div className="text-indigo-500 mb-4 text-4xl">"</div>
              <p className="text-slate-300 italic mb-6">"I was stuck in a generic Analyst role. SkillSync identified my intersection of interests and paved a 12-week roadmap to becoming a Growth Product Manager."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800" />
                <div>
                  <div className="text-white font-medium text-sm">Sarah Jenkins</div>
                  <div className="text-slate-500 text-xs">Growth PM @ TechCorp</div>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 relative">
              <div className="text-cyan-500 mb-4 text-4xl">"</div>
              <p className="text-slate-300 italic mb-6">"The gap detection is terrifyingly accurate. It pointed out exactly which DevOps tools I was missing. Landed a Sr. role two months after finishing the roadmap."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800" />
                <div>
                  <div className="text-white font-medium text-sm">David Chen</div>
                  <div className="text-slate-500 text-xs">DevSecOps Engineer</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 relative">
              <div className="text-blue-500 mb-4 text-4xl">"</div>
              <p className="text-slate-300 italic mb-6">"As an academic transitioning to industry, I had no idea what roles fit. It placed me perfectly as a Behavioral Researcher. Invaluable platform."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800" />
                <div>
                  <div className="text-white font-medium text-sm">Dr. Emily Rostova</div>
                  <div className="text-slate-500 text-xs">Behavioral Researcher</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- FOOTER ------------------- */}
      <footer className="border-t border-white/10 bg-[#050505] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">S</div>
              <span className="text-xl font-bold tracking-tight text-white">SkillSync <span className="text-indigo-400">AI</span></span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">The world's most advanced AI career intelligence platform. Map your future with absolute precision.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/profile" className="hover:text-white transition-colors">Analysis Engine</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-600">
          <p>© {new Date().getFullYear()} SkillSync AI. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
