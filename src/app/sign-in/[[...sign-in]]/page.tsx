import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-dvh flex flex-col lg:flex-row">
      {/* Left — Emotional Message Panel */}
      <div className="lg:w-1/2 bg-slate-900 flex flex-col items-center justify-center p-12 md:p-20 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full -ml-40 -mt-40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-500/5 rounded-full -mr-20 -mb-20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Class of 2026 · English Stylistics
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-8">
            This is our<br />
            <span className="text-teal-400">Final Chapter.</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium mb-10">
            My friend — this is the last semester of our academic journey together.
            I am genuinely <span className="text-white font-black">proud of every single one of you.</span>
          </p>

          <p className="text-slate-400 text-base leading-relaxed font-medium mb-12">
            You've made it this far. The finish line is right there.
            Sign in, pick up where you left off, and let&apos;s close this chapter 
            <span className="text-teal-400 font-black"> in style — together.</span>
          </p>

          {/* Ruby's signature */}
          <div className="flex items-center gap-5 p-6 bg-white/5 rounded-[2rem] border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center flex-shrink-0 shadow-xl shadow-teal-500/20">
              <span className="material-symbols-outlined text-2xl text-slate-900 filled">favorite</span>
            </div>
            <div>
              <p className="text-white font-black text-sm">With love, Ruby 💙</p>
              <p className="text-slate-400 text-xs font-medium mt-1">
                &ldquo;We&apos;re not just classmates. We&apos;re a team.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Clerk Sign In */}
      <div className="lg:w-1/2 bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Welcome back, my friend</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Sign in to save your progress and rankings</p>
          </div>
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900",
                headerTitle: "font-black text-slate-900 dark:text-white tracking-tighter",
                headerSubtitle: "font-bold text-slate-500 text-sm",
                socialButtonsBlockButton: "font-bold rounded-xl border border-slate-200",
                formButtonPrimary: "bg-slate-900 hover:bg-slate-700 font-black text-sm rounded-xl",
                footerActionLink: "text-teal-600 font-bold",
                formFieldInput: "rounded-xl border-slate-200 font-bold",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
