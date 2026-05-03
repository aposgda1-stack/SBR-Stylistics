import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-slate-50 py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2 font-serif">Start your stylistics mastery journey today</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-xl border border-slate-200 rounded-2xl",
              headerTitle: "font-serif text-slate-900",
              headerSubtitle: "font-sans text-slate-500",
              socialButtonsBlockButton: "font-sans",
              formButtonPrimary: "bg-slate-900 hover:bg-slate-700 font-sans text-sm",
              footerActionLink: "text-slate-700 font-sans",
            },
          }}
        />
      </div>
    </div>
  );
}
