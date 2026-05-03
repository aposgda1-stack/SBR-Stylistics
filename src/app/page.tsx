import Link from "next/link";
import { getAllChapters, getCourseStats } from "@/lib/contentService";
import ChapterCard from "@/components/ChapterCard";
import Footer from "@/components/Footer";

export default function HomePage() {
  const chapters = getAllChapters();
  const stats = getCourseStats();
  const currentChapter = chapters.find((c) => c.status === "in-progress");
  const currentLesson = currentChapter?.lessons[0];

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Hero Section & Course Progress Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hero Left */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 mb-4 relative">
              <img src="/images/home_hero.png" alt="Stylistics Home" className="w-full h-full object-cover" />
            </div>
            <span className="font-label-sm text-label-sm text-on-secondary-container bg-secondary-container px-3 py-1 rounded-full w-fit">
              CLASS OF 2026 🎓
            </span>
            <h2 className="font-display-lg text-display-lg text-primary tracking-tight">
              Seniors, We Made It! The Final Chapter
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              From our first lecture to this exact moment, I am incredibly proud of every single one of you. Let's master Stylistics together and finish this journey strong. You are ready for this!
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {currentLesson && (
                <Link
                  href={`/lessons/${currentChapter?.id}/${currentLesson.id}`}
                  className="bg-primary text-on-primary font-body-md px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
                >
                  <span>Continue Final Review</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              )}
              <Link
                href="/lessons"
                className="bg-white border border-outline-variant text-primary font-body-md px-8 py-4 rounded-xl hover:bg-surface-container-low transition-all"
              >
                View Exam Curriculum
              </Link>
            </div>
          </div>

          {/* Hero Right / Progress Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <span className="material-symbols-outlined text-[80px]">workspace_premium</span>
              </div>
              <div className="relative z-10 space-y-8 flex-grow">
                <div className="space-y-1">
                  <h3 className="font-label-sm text-label-sm text-on-secondary-container dark:text-teal-400 uppercase">
                    Your Graduation Progress
                  </h3>
                  <p className="font-headline-md text-headline-md text-slate-900 dark:text-white">
                    {currentChapter?.title ?? "Final Stylistics Review"}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="font-body-md text-slate-500 dark:text-slate-400">Path to 100%</span>
                    <span className="font-headline-md text-primary dark:text-teal-400">{stats.progressPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-on-secondary-container dark:bg-teal-500 rounded-full progress-bar"
                      style={{ width: `${stats.progressPct}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <span className="block font-label-sm text-slate-400">Chapters Done</span>
                    <span className="font-body-lg font-bold text-slate-900 dark:text-white">
                      {stats.completed} / {stats.total}
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <span className="block font-label-sm text-slate-400">Total Lessons</span>
                    <span className="font-body-lg font-bold text-slate-900 dark:text-white">
                      {chapters.reduce((acc, c) => acc + c.lessons.length, 0)} Steps
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-xs text-slate-500">school</span>
                    </div>
                  ))}
                </div>
                <span className="text-label-sm text-slate-400 italic">Seniors studying right now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Chapter List */}
        <section className="mt-section-gap">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <h3 className="font-headline-lg text-headline-lg text-slate-900 dark:text-white">The Senior Curriculum</h3>
              <p className="text-on-surface-variant max-w-md">
                Everything you need to crush the final exam. Curated with love, sweat, and lots of coffee.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
            {/* Explore More Card */}
            <Link
              href="/lessons"
              className="group bg-white p-6 rounded-2xl border border-dashed border-slate-200 hover:border-on-primary-fixed-variant transition-all cursor-pointer flex flex-col items-center justify-center text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-4xl mb-2">explore</span>
              <span className="font-label-sm">Explore More Chapters</span>
            </Link>
          </div>
        </section>

        {/* Final CTA / Resume Section */}
        <section className="mt-section-gap mb-20">
          <div className="bg-primary-container dark:bg-teal-900 text-on-primary-container dark:text-teal-50 p-12 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <span className="material-symbols-outlined text-[15rem] text-white">school</span>
            </div>
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="font-headline-lg text-headline-lg mb-4 text-white">
                One Last Push, Seniors!
              </h2>
              <p className="text-on-primary-container dark:text-teal-100 opacity-90 text-body-lg">
                {currentChapter 
                  ? `You are currently reviewing "${currentChapter.title}". Keep going, graduation is just around the corner.` 
                  : "Start your final review now. Let's make these last days count!"}
              </p>
            </div>
            <div className="relative z-10">
              {currentLesson ? (
                <Link
                  href={`/lessons/${currentChapter?.id}/${currentLesson.id}`}
                  className="bg-white dark:bg-teal-50 text-primary-container dark:text-teal-900 font-bold px-10 py-5 rounded-2xl shadow-2xl hover:scale-105 transition-transform inline-block"
                >
                  Resume Final Review
                </Link>
              ) : (
                <Link
                  href="/lessons"
                  className="bg-white dark:bg-teal-50 text-primary-container dark:text-teal-900 font-bold px-10 py-5 rounded-2xl shadow-2xl hover:scale-105 transition-transform inline-block"
                >
                  Start Reviewing
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
