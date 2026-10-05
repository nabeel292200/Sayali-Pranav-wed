import { RevealOnScroll } from './RevealOnScroll';
import { weddingData } from '../data/weddingData';

export function FooterSection() {
  const { couple, footer } = weddingData;

  return (
    <footer className="relative isolate overflow-hidden pt-24 pb-12 text-center">
      <img
        src="/assets/footer-floral.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        width="1920"
        height="912"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-parchment/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-royal-deep to-transparent"
      />

      <RevealOnScroll className="px-6">
        <p className="font-display text-[clamp(1.5rem,7.5vw,1.875rem)] tracking-[0.12em] whitespace-nowrap text-royal uppercase">
          {couple.brideShort}{' '}
          <span className="text-gold">&amp;</span>{' '}
          {couple.groomShort}
        </p>

        <div className="gold-rule mx-auto mt-5 w-24" />

        <p className="mt-6 text-sm text-ink/80">{footer.families}</p>

        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
          <p className="font-display text-2xl font-semibold tracking-[0.18em] text-royal-deep">
            {couple.hashtag}
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </RevealOnScroll>
    </footer>
  );
}
