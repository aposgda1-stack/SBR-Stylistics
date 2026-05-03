import { notFound } from "next/navigation";
import Link from "next/link";
import { getLessonById, getChapterById } from "@/lib/contentService";
import { LessonContent } from "@/types";
import Footer from "@/components/Footer";
import ProgressSaver from "@/components/ProgressSaver";

interface Props {
  params: Promise<{ chapterId: string; lessonId: string }>;
}

function renderContent(block: LessonContent & { arabicExplanation?: string; type?: string }, idx: number) {
  const content = (() => {
    const isTheory = block.heading?.toLowerCase().includes("theory") || block.type === "theoretical";
    const isApplied = block.heading?.toLowerCase().includes("applied");

    const renderArabic = (arabicText?: string) => {
      if (!arabicText) return null;
      return (
        <div className="mt-6 bg-slate-50 border-r-4 border-primary rounded-l-xl p-5 shadow-sm text-right font-arabic" dir="rtl">
          <div className="flex items-center justify-end gap-2 mb-2 text-primary font-bold">
            <span>شرح روبي بالمصري</span>
            <span className="material-symbols-outlined text-sm">tips_and_updates</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-lg">{arabicText}</p>
        </div>
      );
    };

    switch (block.type) {
      case "definition":
        return (
          <section key={idx} className="mb-12">
            <div className={`bg-gradient-to-br ${isTheory ? 'from-primary/5 to-primary/10 border-primary/10' : 'from-secondary/5 to-secondary/10 border-secondary/10'} border rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group`}>
              <div className="absolute -top-10 -right-10 opacity-5 text-primary group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[200px]">{isTheory ? 'menu_book' : 'psychology'}</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${isTheory ? 'bg-primary' : 'bg-secondary'} text-white flex items-center justify-center shadow-lg shadow-primary/20`}>
                    <span className="material-symbols-outlined text-xl">{isTheory ? 'school' : 'auto_stories'}</span>
                  </div>
                  <h3 className={`font-label-md text-label-sm uppercase tracking-[0.2em] ${isTheory ? 'text-primary' : 'text-secondary'}`}>
                    {block.heading || "Definition"}
                  </h3>
                </div>
                <p className="font-headline-lg text-display-sm text-slate-900 leading-[1.3] font-serif whitespace-pre-line">
                  <span className="text-primary/40 mr-2">“</span>
                  {block.body || (block as any).content}
                  <span className="text-primary/40 ml-2">”</span>
                </p>
                {renderArabic(block.arabicExplanation)}
              </div>
            </div>
          </section>
        );

      case "theoretical":
      case "text":
        return (
          <div key={idx} className="space-y-6 mb-12 px-2">
            {block.heading && (
              <h4 className="font-headline-md text-3xl text-primary font-bold border-b-2 border-primary/10 pb-4 inline-block">{block.heading}</h4>
            )}
            <div className="font-body-lg text-xl text-slate-600 leading-relaxed font-serif whitespace-pre-line">
              {block.body || (block as any).content}
            </div>
            {renderArabic(block.arabicExplanation)}
          </div>
        );

      case "analysis":
        return (
          <div key={idx} className={`bg-white rounded-[2rem] p-10 border ${isApplied ? 'border-teal-100' : 'border-slate-100'} shadow-[0_10px_40px_rgba(0,0,0,0.02)] mb-12 hover:shadow-xl transition-shadow duration-500`}>
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 rounded-2xl ${isApplied ? 'bg-teal-50 text-teal-600' : 'bg-slate-50 text-slate-600'} flex items-center justify-center`}>
                <span className="material-symbols-outlined">{isApplied ? 'explore' : 'analytics'}</span>
              </div>
              <h4 className="font-headline-md text-2xl text-slate-900 font-bold">{block.heading}</h4>
            </div>
            {block.body && <p className="font-body-lg text-lg text-slate-500 mb-10 leading-relaxed font-serif italic">{block.body}</p>}
            {renderArabic(block.arabicExplanation)}
            
            {block.steps && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {block.steps.map((step, si) => (
                  <div 
                    key={si} 
                    className="flex flex-col gap-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:border-primary/20 transition-all group hover:scale-[1.02]"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {si + 1}
                    </div>
                    <div>
                      <p className="font-headline-sm text-lg text-slate-900 mb-2 font-bold">{step.label}</p>
                      <p className="font-body-md text-slate-500 leading-relaxed">{step.body}</p>
                      {renderArabic((step as any).arabicExplanation)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        // Render fallback for unknown types
        return (
          <div key={idx} className="space-y-6 mb-12 px-2">
            <div className="font-body-lg text-xl text-slate-600 leading-relaxed font-serif whitespace-pre-line">
              {(block as any).content || block.body}
            </div>
            {renderArabic(block.arabicExplanation)}
          </div>
        );
    }
  })();

  return (
    <div
      key={idx}
      className="animate-fade-in-up"
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      {content}
    </div>
  );
}

import LessonTools from "@/components/LessonTools";

export default async function LessonPage({ params }: Props) {
  const { chapterId, lessonId } = await params;
  const chapter = getChapterById(chapterId);
  const lesson = getLessonById(chapterId, lessonId);

  if (!chapter || !lesson) notFound();

  const fullText = lesson.content.map(b => b.body || "").join(" ");
  const wordCount = fullText.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

  return (
    <>
      <LessonTools title={lesson.title} content={fullText} />
      <main className="px-6 py-12 md:py-20 bg-surface">
        <ProgressSaver lessonId={lessonId} />
        <div className="max-w-[800px] mx-auto">
          {/* Lesson Banner */}
          <div className="w-full aspect-[21/9] md:aspect-[21/6] rounded-3xl overflow-hidden shadow-sm mb-10 relative border border-slate-100 animate-fade-in-up">
            <img src="/images/lesson_hero.png" alt="Stylistics Lesson" className="w-full h-full object-cover" />
          </div>
          
          {/* Breadcrumbs */}
          <nav className="breadcrumb-nav mb-8 flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant flex-wrap">
            <Link href="/lessons" className="hover:text-primary transition-colors">
              Curriculum
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Chapter {chapter.number}</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>{chapter.title}</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">{lesson.title}</span>
          </nav>

          {/* Lesson Title */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-2">
              <span className="bg-primary-container text-on-primary-fixed text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                {readingTime} min read
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{wordCount} words</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary mb-4">{lesson.title}</h1>
            <div className="h-1 w-24 bg-primary-container rounded-full mb-6" />
            <p className="font-body-lg text-body-lg text-on-surface-variant italic">
              {lesson.subtitle}
            </p>
          </div>

          {/* Content Blocks */}
          <article className="space-y-2 mb-16">
            {lesson.content.map((block, idx) => renderContent(block, idx))}
          </article>

          {/* Ruby's Tip */}
          {lesson.rubyTip && (
            <div className="mb-16 bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group animate-fade-in-up">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-9xl">lightbulb</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">tips_and_updates</span>
                  </div>
                  <h3 className="font-headline-sm text-xl font-bold tracking-tight">نصيحة من روبي ✨</h3>
                </div>
                <p className="font-body-lg text-lg leading-relaxed text-slate-200 italic">
                  "{lesson.rubyTip}"
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-slate-100">
            {lesson.prevLesson ? (
              <Link
                href={`/lessons/${chapterId}/${lesson.prevLesson}`}
                className="w-full sm:w-auto px-8 py-3 rounded-lg border border-slate-200 text-on-secondary-fixed-variant font-label-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
                Previous
              </Link>
            ) : (
              <Link
                href="/lessons"
                className="w-full sm:w-auto px-8 py-3 rounded-lg border border-slate-200 text-on-secondary-fixed-variant font-label-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
                Back to Curriculum
              </Link>
            )}

            {lesson.quizId ? (
              <Link
                href={`/quiz?quizId=${lesson.quizId}&nextLesson=${lesson.nextLesson || ""}&chapterId=${chapterId}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 animate-pulse"
              >
                Take Section Quiz
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  quiz
                </span>
              </Link>
            ) : lesson.nextLesson ? (
              <Link
                href={`/lessons/${chapterId}/${lesson.nextLesson}`}
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary-container text-on-primary-fixed font-label-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                Next Lesson
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            ) : (
              <Link
                href={`/exam?examId=${chapter.examId}`}
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-tertiary text-white font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                Begin Chapter Exam
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  assignment
                </span>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
