import Link from "next/link";
import { getGlossaryTerms } from "@/lib/contentService";
import Footer from "@/components/Footer";

export default function GlossaryPage() {
  const terms = getGlossaryTerms();

  return (
    <>
      <main className="max-w-[600px] mx-auto px-6 py-8 pb-32">
        {/* Header */}
        <div className="mb-10">
          <p className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest mb-1">
            Reference
          </p>
          <h1 className="font-display-lg text-display-lg text-primary">Glossary</h1>
          <p className="font-body-lg text-on-surface-variant mt-2">
            A curated dictionary of stylistic devices and linguistic concepts.
          </p>
        </div>

        {/* Terms list */}
        <div className="space-y-8">
          {terms.map((term) => (
            <Link key={term.id} href={`/glossary/${term.id}`} className="block">
              <section className="bg-white border border-slate-100 rounded-xl p-8 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.06)] bento-card hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-display-lg text-[36px] text-primary mb-1 leading-none">
                      {term.term}
                    </h2>
                    {term.pronunciation && (
                      <p className="font-body-md text-on-secondary-container italic">
                        {term.pronunciation}
                      </p>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest rounded-full flex-shrink-0">
                    {term.partOfSpeech}
                  </span>
                </div>

                <div>
                  <h3 className="font-label-sm text-label-sm text-on-primary-container mb-2 uppercase">
                    Core Definition
                  </h3>
                  <p className="font-headline-md text-[18px] leading-relaxed text-on-surface line-clamp-3">
                    {term.definition}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-on-secondary-container font-label-sm font-semibold uppercase">
                  Read More
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </section>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
