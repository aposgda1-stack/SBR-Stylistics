"use client";

import { useState, useRef, useEffect } from "react";

export default function MickChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome, Scholar. I am Professor Mick Short. I am here to provide academic guidance and deep linguistic analysis to support your studies in Stylistics. How can I assist your academic journey today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          persona: "You are Professor Mick Short, a world-renowned Stylistics expert. You are friendly, academic, and encouraging. You speak in a mix of English and Egyptian Arabic to help the student feel comfortable. Focus on explaining technical terms simply."
        }),
      });

      const data = await response.json();
      if (data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "عذراً يا بطل، يبدو أن هناك مشكلة تقنية بسيطة في الاتصال بالبروفيسور. تأكد من إعداد مفتاح الـ API بشكل صحيح في بيئة التشغيل. (Technical Error: Connection Failed)" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 shadow-2xl flex items-center justify-center hover:scale-110 transition-all group relative border-4 border-white dark:border-slate-800"
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-3xl">close</span>
        ) : (
          <span className="material-symbols-outlined text-3xl">person_search</span>
        )}
        {!isOpen && (
          <div className="absolute -top-12 right-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-slate-100 dark:border-slate-800 whitespace-nowrap animate-bounce">
            Ask Prof. Mick! 👨‍🏫
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[85vw] md:w-[400px] bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
          {/* Header */}
          <div className="bg-slate-900 p-6 flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-slate-900">
                <span className="material-symbols-outlined text-2xl font-bold">person</span>
             </div>
             <div>
                <h3 className="text-white font-bold text-lg">Professor Mick Short</h3>
                <p className="text-teal-400 text-[10px] uppercase tracking-widest font-bold">World Stylistics Expert</p>
             </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-[450px] overflow-y-auto p-6 space-y-4 scroll-smooth bg-slate-50/50 dark:bg-slate-950"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-slate-900 text-white rounded-tr-none shadow-lg"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl animate-pulse">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask about parallelism, Grice, Labov..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-full pl-4 pr-12 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-none outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
