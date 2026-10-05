import { RevealOnScroll } from './RevealOnScroll';
import { weddingData } from '../data/weddingData';

export function BlessingSection() {
  const { blessing } = weddingData;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-royal to-royal-deep px-5 py-20">
      <div aria-hidden="true" className="jaali absolute inset-0 opacity-[0.12]" />

      <RevealOnScroll className="relative mx-auto max-w-md text-center">
        <div className="gold-rule mx-auto w-20" />

        <p className="mt-8 font-display text-2xl leading-relaxed text-parchment">
          {blessing.line}
        </p>

        <p className="mt-5 font-display text-lg leading-relaxed text-parchment/80 italic">
          “{blessing.translation}”
        </p>

        <p className="mt-4 text-[0.6rem] tracking-[0.3em] text-gold uppercase">
          {blessing.source}
        </p>

        <div className="gold-rule mx-auto mt-8 w-20" />
      </RevealOnScroll>
    </section>
  );
}
