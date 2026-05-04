"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AdelChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "أهلاً بيك يا بطل! أنا بروفيسور عادل، مستشارك الخاص في مادة الـ Stylistics.. عندك أي سؤال محتاج تبسطه؟ ✨" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-slate-900 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative border-2 border-white/20"
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-3xl">close</span>
        ) : (
          <span className="material-symbols-outlined text-3xl">account_circle</span>
        )}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 rounded-full border-2 border-white animate-bounce" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800 animate-fade-in-up">
          {/* Header */}
          <div className="p-8 bg-slate-900 text-white flex items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full -mr-10 -mt-10 blur-2xl" />
            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <span className="material-symbols-outlined text-slate-900 font-bold">person</span>
            </div>
            <div>
              <h3 className="font-bold text-lg leading-none mb-1">Prof. Adel</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                Stylistics Expert
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950/50"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 md:p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === "user" 
                  ? "bg-slate-900 text-white rounded-tr-none" 
                  : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-800"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Prof. Adel anything..."
                className="flex-1 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-5 py-4 text-sm focus:border-teal-500 outline-none text-slate-900 dark:text-white transition-all shadow-inner"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-14 h-14 rounded-2xl bg-teal-500 text-slate-900 flex items-center justify-center hover:bg-teal-400 shadow-lg shadow-teal-500/20 transition-all disabled:opacity-50 active:scale-90"
              >
                <span className="material-symbols-outlined font-bold">send</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
