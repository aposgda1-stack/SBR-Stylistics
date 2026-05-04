import Link from "next/link";
import { Chapter } from "@/types";

interface ChapterCardProps {
  chapter: Chapter;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  const isCompleted = chapter.status === "completed";
  const isInProgress = chapter.status === "in-progress";
  const isLocked = chapter.status === "locked";

  const firstLesson = chapter.lessons[0];
  const lessonHref =
    firstLesson
      ? `/chapters/${chapter.id}/${firstLesson.id}`
      : "#";

  if (isInProgress) {
    return (
      <Link href={lessonHref} className="block group bg-white p-6 rounded-2xl border-2 border-on-primary-fixed-variant shadow-xl transition-all cursor-pointer relative">
        <div className="absolute top-0 right-0 p-4">
          <span className="bg-on-secondary-container text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">
            Current
          </span>
        </div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined">{chapter.icon}</span>
          </div>
        </div>
        <h4 className="font-headline-md text-headline-md mb-2">{chapter.title}</h4>
        <p className="text-on-surface-variant text-body-md line-clamp-2">{chapter.description}</p>
        <div className="mt-6">
          <div className="w-full h-1 bg-slate-100 rounded-full mb-2">
            <div
              className="h-full bg-on-secondary-container rounded-full progress-bar"
              style={{ width: `${chapter.progress ?? 0}%` }}
            />
          </div>
          <span className="text-label-sm text-on-secondary-container font-bold">
            {chapter.progress}% Chapter Progress
          </span>
        </div>
      </Link>
    );
  }

  if (isCompleted) {
    return (
      <Link href={lessonHref} className="block group bg-white p-6 rounded-2xl border border-slate-100 hover:border-on-primary-fixed-variant transition-all cursor-pointer relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
            <span className="material-symbols-outlined">{chapter.icon}</span>
          </div>
          <span className="material-symbols-outlined filled text-teal-600">check_circle</span>
        </div>
        <h4 className="font-headline-md text-headline-md mb-2">{chapter.title}</h4>
        <p className="text-on-surface-variant text-body-md line-clamp-2">{chapter.description}</p>
        <div className="mt-6 flex items-center text-label-sm text-slate-400 gap-2">
          <span className="material-symbols-outlined text-sm">timer</span>
          <span>Completed {chapter.completedAgo}</span>
        </div>
      </Link>
    );
  }

  if (isLocked) {
    return (
      <div className="group bg-white p-6 rounded-2xl border border-slate-100 cursor-not-allowed opacity-70">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined">{chapter.icon}</span>
          </div>
          <span className="material-symbols-outlined text-slate-300">lock</span>
        </div>
        <h4 className="font-headline-md text-headline-md mb-2">{chapter.title}</h4>
        <p className="text-on-surface-variant text-body-md line-clamp-2">{chapter.description}</p>
        <div className="mt-6 flex items-center text-label-sm text-slate-400 gap-2">
          <span className="material-symbols-outlined text-sm">schedule</span>
          <span>Estimated {chapter.estimatedHours} hours</span>
        </div>
      </div>
    );
  }

  return null;
}
