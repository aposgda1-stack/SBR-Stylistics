import Link from "next/link";
import { getAllChapters } from "@/lib/contentService";
import Footer from "@/components/Footer";

export default function LessonsPage() {
  const chapters = getAllChapters();

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 border-l-4 border-primary pl-6">
          <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block tracking-widest uppercase">
            Course Curriculum
          </span>
          <h1 className="font-display-lg text-display-lg text-on-surface">
            All Chapters & Lessons
          </h1>
        </div>

        {/* Chapter list */}
        <div className="space-y-12">
          {chapters.map((chapter) => (
            <section key={chapter.id}>
              {/* Chapter Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    chapter.status === "completed"
                      ? "bg-primary-fixed text-on-primary-fixed"
                      : chapter.status === "in-progress"
                      ? "bg-secondary-container text-on-secondary-container"
                      : "bg-surface-container text-slate-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{chapter.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                      Chapter {chapter.number}
                    </span>
                    {chapter.status === "completed" && (
                      <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
                        Completed
                      </span>
                    )}
                    {chapter.status === "in-progress" && (
                      <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-semibold">
                        In Progress — {chapter.progress}%
                      </span>
                    )}
                    {chapter.status === "locked" && (
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold">
                        Locked
                      </span>
                    )}
                  </div>
                  <h2 className="font-headline-md text-headline-md">{chapter.title}</h2>
                </div>
              </div>

              {/* Lessons List */}
              {chapter.lessons.length > 0 ? (
                <div className="ml-0 md:ml-[4.5rem] space-y-3">
                  {chapter.lessons.map((lesson, idx) => (
                    <Link
                      key={lesson.id}
                      href={
                        chapter.status !== "locked"
                          ? `/lessons/${chapter.id}/${lesson.id}`
                          : "#"
                      }
                      className={`flex items-center gap-4 p-5 rounded-xl border transition-all group ${
                        chapter.status === "locked"
                          ? "border-slate-100 bg-white opacity-60 cursor-not-allowed"
                          : "border-slate-100 bg-white hover:border-on-primary-fixed-variant hover:shadow-md cursor-pointer"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          chapter.status === "completed"
                            ? "bg-teal-100 text-teal-700"
                            : chapter.status === "in-progress" && idx === 0
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {chapter.status === "completed" ? (
                          <span className="material-symbols-outlined text-sm filled">check</span>
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                          {lesson.title}
                        </p>
                        <p className="text-sm text-on-surface-variant mt-0.5">{lesson.subtitle}</p>
                      </div>
                      {chapter.status !== "locked" && (
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">
                          chevron_right
                        </span>
                      )}
                      {chapter.status === "locked" && (
                        <span className="material-symbols-outlined text-slate-300">lock</span>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="ml-0 md:ml-[4.5rem] p-5 rounded-xl border border-dashed border-slate-200 text-center text-slate-400">
                  <span className="font-label-sm text-label-sm">
                    {chapter.status === "locked"
                      ? `Complete previous chapters to unlock — Estimated ${chapter.estimatedHours}h`
                      : "Coming soon"}
                  </span>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Practice & Exam CTAs */}
        <div className="mt-section-gap grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <Link
            href="/quiz"
            className="flex flex-col p-8 bg-secondary-container rounded-2xl border border-transparent hover:border-on-secondary-container transition-all group"
          >
            <span className="material-symbols-outlined text-on-secondary-container text-3xl mb-4">
              edit_note
            </span>
            <h3 className="font-headline-md text-headline-md text-on-secondary-container mb-2">
              Practice Quiz
            </h3>
            <p className="text-on-secondary-container opacity-80 font-body-md">
              10 adaptive questions across all covered chapters. Explanations included.
            </p>
            <div className="mt-6 flex items-center gap-2 text-on-secondary-container font-semibold font-label-sm uppercase tracking-wider">
              Start Practice
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>

          <Link
            href="/exam"
            className="flex flex-col p-8 bg-primary-container rounded-2xl border border-transparent hover:border-on-primary-fixed-variant transition-all group"
          >
            <span className="material-symbols-outlined text-on-primary text-3xl mb-4">
              history_edu
            </span>
            <h3 className="font-headline-md text-headline-md text-white mb-2">
              Comprehensive Exam
            </h3>
            <p className="text-on-primary-container opacity-80 font-body-md">
              25-question timed exam covering the core concepts of Stylistics.
            </p>
            <div className="mt-6 flex items-center gap-2 text-on-primary-container font-semibold font-label-sm uppercase tracking-wider">
              Begin Exam
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
