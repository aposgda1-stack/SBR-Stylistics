import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllChapters, getLessonById, getChapterById, getQuizQuestionsById } from "@/lib/contentService";
import { LessonContent } from "@/types";
import Footer from "@/components/Footer";
import ProgressSaver from "@/components/ProgressSaver";
import LessonQuiz from "@/components/LessonQuiz";
import LessonTools from "@/components/LessonTools";
import PrintButton from "@/components/PrintButton";

interface Props {
  params: Promise<{ chapterId: string; lessonId: string }>;
}

export async function generateStaticParams() {
  const chapters = getAllChapters();
  const paths: { chapterId: string; lessonId: string }[] = [];
  
  chapters.forEach(chapter => {
    chapter.lessons.forEach(lesson => {
      paths.push({
        chapterId: chapter.id,
        lessonId: lesson.id
      });
    });
  });
  
  return paths;
}

const formatContent = (text: string) => {
  if (!text) return "";
  return text.split("**").map((part, i) => 
    i % 2 === 1 ? <strong key={i} className="text-primary font-black">{part}</strong> : part
  );
};

function renderContent(block: LessonContent & { arabicExplanation?: string; type?: string }, idx: number) {
  const content = (() => {
    const isTheory = block.heading?.toLowerCase().includes("theory") || block.type === "theoretical" || block.type === "definition";
    const isApplied = block.heading?.toLowerCase().includes("applied") || block.type === "analysis";

    const renderArabic = (arabicText?: string) => {
      if (!arabicText) return null;
      return (
        <div className="mt-8 bg-teal-500/5 border-r-8 border-teal-500 rounded-l-[2rem] p-8 shadow-inner text-right font-bold dir-rtl" dir="rtl">
          <div className="flex items-center justify-end gap-3 mb-4 text-teal-600">
            <span className="text-xs uppercase tracking-widest font-black">شعبولي الموضوع كدا</span>
            <span className="material-symbols-outlined text-2xl">emoji_objects</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-[2.2] text-2xl">{formatContent(arabicText)}</p>
        </div>
      );
    };

    switch (block.type) {
      case "definition":
        return (
          <section key={idx} className="mb-16">
            <div className={`bg-white dark:bg-slate-900 border-2 ${isTheory ? 'border-primary/20' : 'border-secondary/20'} rounded-[3rem] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.04)] relative overflow-hidden group`}>
              <div className="absolute -top-10 -right-10 opacity-5 text-primary group-hover:scale-110 transition-transform duration-1000">
                <span className="material-symbols-outlined text-[250px]">{isTheory ? 'menu_book' : 'psychology'}</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-14 h-14 rounded-2xl ${isTheory ? 'bg-primary shadow-primary/30' : 'bg-secondary shadow-secondary/30'} text-white flex items-center justify-center shadow-2xl`}>
                    <span className="material-symbols-outlined text-3xl font-bold">{isTheory ? 'school' : 'auto_stories'}</span>
                  </div>
                  <h3 className={`font-black text-xs uppercase tracking-[0.4em] ${isTheory ? 'text-primary' : 'text-secondary'}`}>
                    {block.heading || "Definition"}
                  </h3>
                </div>
                <p className="text-2xl md:text-5xl text-slate-900 dark:text-white leading-[1.2] font-black tracking-tighter">
                  {formatContent(block.body || (block as any).content)}
                </p>
                {renderArabic(block.arabicExplanation)}
              </div>
            </div>
          </section>
        );

      case "analysis":
        return (
          <div key={idx} className={`bg-white dark:bg-slate-900 rounded-[3rem] p-12 border-2 ${isApplied ? 'border-teal-500/10' : 'border-slate-100 dark:border-slate-800'} shadow-sm mb-16 hover:shadow-2xl transition-all duration-700`}>
            <div className="flex items-center gap-5 mb-10">
              <div className={`w-16 h-16 rounded-3xl ${isApplied ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'} flex items-center justify-center shadow-xl`}>
                <span className="material-symbols-outlined text-3xl">{isApplied ? 'explore' : 'analytics'}</span>
              </div>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{block.heading}</h4>
            </div>
            {block.body && <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed font-bold italic">{formatContent(block.body)}</p>}
            
            {block.steps && Array.isArray(block.steps) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {block.steps.map((step, si) => (
                  <div 
                    key={si} 
                    className="flex flex-col gap-6 p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 group hover:border-primary transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center font-black text-primary group-hover:bg-primary group-hover:text-white transition-all text-xl">
                      {si + 1}
                    </div>
                    <div>
                      <p className="text-2xl text-slate-900 dark:text-white mb-4 font-black tracking-tight">{formatContent(step.label)}</p>
                      <p className="text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{formatContent(step.body)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {renderArabic(block.arabicExplanation)}
          </div>
        );

      default:
        return (
          <div key={idx} className="space-y-10 mb-16 px-4">
            {block.heading && (
               <h4 className="text-3xl font-black text-primary tracking-tighter border-l-8 border-primary pl-6 py-2">{block.heading}</h4>
            )}
            <div className="text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
              {formatContent(block.body || (block as any).content)}
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

export default async function LessonPage({ params }: Props) {
  const { chapterId, lessonId } = await params;
  const chapter = getChapterById(chapterId);
  const lesson = getLessonById(chapterId, lessonId);

  if (!chapter || !lesson) notFound();

  const quizQuestions = lesson.quizId ? getQuizQuestionsById(lesson.quizId) : [];
  const fullText = lesson.content.map(b => b.body || "").join(" ");
  const wordCount = fullText.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <LessonTools title={lesson.title} content={fullText} />
      <main className="px-4 md:px-12 py-10 md:py-24 bg-surface">
        <ProgressSaver lessonId={lessonId} />
        <div className="max-w-[850px] mx-auto">
          {/* Top Quick Link & Notice */}
          {lesson.quizId && (
            <div className="mb-10 flex flex-col items-center gap-4 animate-bounce-subtle">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                🚀 Want to test your knowledge immediately?
              </p>
              <a 
                href="#lesson-quiz" 
                className="flex items-center gap-3 px-8 py-3 bg-primary dark:bg-teal-500 text-white dark:text-slate-900 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-110 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">quiz</span>
                Jump to End-of-Lesson Test
              </a>
            </div>
          )}

          {/* Lesson Banner */}
          <div className="w-full aspect-[21/9] md:aspect-[21/6] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm mb-10 relative border border-slate-100 dark:border-slate-800 animate-fade-in-up">
            <img src="/images/lesson_hero.png" alt="Stylistics Lesson" className="w-full h-full object-cover" />
          </div>
          
          {/* Breadcrumbs */}
          <nav className="breadcrumb-nav mb-8 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest flex-wrap">
            <Link href="/chapters" className="hover:text-primary transition-colors">
              Curriculum
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Chapter {chapter.number}</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary dark:text-teal-500">{lesson.title}</span>
          </nav>

          {/* Lesson Title */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
                {readingTime} min read
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{wordCount} words</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-8">
              {lesson.title}
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-bold italic leading-relaxed max-w-2xl">
                {lesson.subtitle}
              </p>
              <PrintButton />
            </div>
          </div>

          {/* Content Blocks */}
          <article className="space-y-12 mb-24">
            {lesson.content.map((block, idx) => renderContent(block, idx))}
          </article>

          {/* Ruby's Tip */}
          {lesson.rubyTip && (
            <div className="mb-12 bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group animate-fade-in-up">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-[150px]">lightbulb</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-slate-900 shadow-xl">
                    <span className="material-symbols-outlined text-2xl font-bold">tips_and_updates</span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-teal-400">Ruby's Personal Tip ✨</h3>
                </div>
                <p className="text-2xl md:text-3xl leading-relaxed text-slate-200 italic font-medium">
                  "{lesson.rubyTip}"
                </p>
              </div>
            </div>
          )}

          {/* Applied Summary Section */}
          {lesson.appliedSummary && (
            <div className="mb-20 relative group">
               <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
               <div className="relative bg-white dark:bg-slate-900 border-2 border-teal-500/20 rounded-[3rem] p-10 md:p-16 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 p-10 opacity-5 pointer-events-none">
                     <span className="material-symbols-outlined text-[150px]">auto_awesome</span>
                  </div>
                  <div className="relative z-10">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-100 dark:border-slate-800 pb-8">
                        <div className="flex items-center gap-5">
                           <div className="w-16 h-16 rounded-3xl bg-teal-500 text-white flex items-center justify-center shadow-2xl shadow-teal-500/20">
                              <span className="material-symbols-outlined text-4xl">favorite</span>
                           </div>
                           <div>
                              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Ruby's Breakdown</h2>
                              <p className="text-teal-600 font-bold text-sm tracking-widest uppercase mt-1">Simple & Practical</p>
                           </div>
                        </div>
                        <div className="px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] self-start md:self-center">
                           شعبولي الموضوع كدا
                        </div>
                     </div>
                     <div className="text-slate-700 dark:text-slate-300 text-2xl md:text-4xl leading-[2.4] font-bold text-right dir-rtl whitespace-pre-line" dir="rtl">
                        {formatContent(lesson.appliedSummary)}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Embedded Quiz Section */}
          {lesson.quizId && (
            <LessonQuiz 
              questions={quizQuestions} 
              chapterId={chapterId} 
              nextLesson={lesson.nextLesson} 
            />
          )}

          {/* Bottom Navigation */}
          {!lesson.quizId && (
            <div className="flex justify-between items-center pt-12 border-t border-slate-100 dark:border-slate-800 mt-20">
              {lesson.prevLesson ? (
                <Link href={`/chapters/${chapterId}/${lesson.prevLesson}`} className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Previous
                </Link>
              ) : (
                <Link href="/chapters" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Curriculum
                </Link>
              )}

              {lesson.nextLesson ? (
                <Link href={`/chapters/${chapterId}/${lesson.nextLesson}`} className="px-10 py-4 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
                  Next Lesson
                </Link>
              ) : (
                <Link href={`/exam?examId=${chapter.examId}`} className="px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
                  Take Chapter Exam
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
