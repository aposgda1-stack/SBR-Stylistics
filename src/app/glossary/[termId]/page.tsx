import { notFound } from "next/navigation";
import Link from "next/link";
import { getGlossaryTerm } from "@/lib/contentService";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ termId: string }>;
}

export default async function GlossaryTermPage({ params }: Props) {
  const { termId } = await params;
  const term = getGlossaryTerm(termId);
  if (!term) notFound();

  return (
    <>
      <main className="max-w-[600px] mx-auto px-6 py-8 pb-32">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
          <Link href="/glossary" className="hover:text-primary transition-colors">
            Glossary
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">{term.term}</span>
        </div>

        {/* Chapter Breadcrumb */}
        <div className="mb-6">
          <p className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest mb-1">
            Chapter Reference
          </p>
          <h2 className="font-headline-md text-headline-md text-primary">
            {term.chapterRef ? term.chapterRef.replace("ch", "Chapter ") : "General Stylistics"}
          </h2>
        </div>

        {/* Word-Box Card */}
        <section className="bg-white border border-slate-100 rounded-xl p-8 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.06)] bento-card mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-display-lg text-display-lg text-primary mb-1">{term.term}</h1>
              {term.pronunciation && (
                <p className="font-body-md text-on-secondary-container italic">{term.pronunciation}</p>
              )}
            </div>
            <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest rounded-full">
              {term.partOfSpeech}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-label-sm text-label-sm text-on-primary-container mb-2 uppercase">
                Core Definition
              </h3>
              <p className="font-headline-md text-headline-md leading-relaxed text-on-surface">
                {term.definition}
              </p>
            </div>

            {term.etymology && (
              <div className="pt-6 border-t border-slate-50">
                <h3 className="font-label-sm text-label-sm text-on-primary-container mb-2 uppercase">
                  Etymology
                </h3>
                <p className="font-body-md text-on-surface-variant">{term.etymology}</p>
              </div>
            )}
          </div>
        </section>

        {/* Linguistic Function */}
        {term.function && (
          <section className="mb-10">
            <h3 className="font-label-sm text-label-sm text-on-primary-container mb-4 uppercase tracking-widest">
              Linguistic Function
            </h3>
            <div className="bg-surface-container-low p-5 rounded-lg border border-transparent hover:border-outline-variant transition-all">
              <p className="font-body-lg text-on-surface leading-relaxed">{term.function}</p>
            </div>
          </section>
        )}

        {/* Examples */}
        {term.examples && term.examples.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-on-tertiary-container filled">
                auto_stories
              </span>
              <h3 className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest">
                Practical Examples
              </h3>
            </div>
            <div className="space-y-4">
              {term.examples.map((ex: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white border-l-4 border-on-tertiary-container p-6 rounded-r-lg shadow-sm"
                >
                  <p className="font-headline-md text-[20px] italic text-on-surface mb-3">
                    {ex.text}
                  </p>
                  <p className="font-label-sm text-on-primary-container">{ex.source}</p>
                  {ex.note && (
                    <p className="mt-2 text-sm text-on-surface-variant italic">{ex.note}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Scholar's Note */}
        {term.scholarNote && (
          <section className="bg-inverse-surface text-inverse-on-surface p-8 rounded-xl relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-6xl">school</span>
            </div>
            <h3 className="font-label-sm text-label-sm text-on-primary-fixed-variant mb-4 uppercase tracking-widest">
              Scholar&apos;s Note
            </h3>
            <p className="font-body-lg italic leading-relaxed">
              &ldquo;{term.scholarNote}&rdquo;
            </p>
          </section>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-200">
          <Link
            href="/glossary"
            className="flex items-center gap-2 font-label-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Glossary
          </Link>
          <Link
            href="/lessons"
            className="flex items-center gap-2 font-label-sm text-primary font-bold hover:opacity-70 transition-opacity"
          >
            View Lessons
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
