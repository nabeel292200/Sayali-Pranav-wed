import { RevealOnScroll } from './RevealOnScroll';
import { weddingData } from '../data/weddingData';

export function FamilyBlessingsSection() {
  const { bride, groom } = weddingData.families;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-royal-deep via-royal to-royal-deep px-5 py-16">
      <div aria-hidden="true" className="jaali absolute inset-0 opacity-[0.12]" />

      <RevealOnScroll className="relative text-center px-4">
        <h2 className="mx-auto max-w-sm font-display text-2xl sm:text-3xl tracking-[0.14em] text-parchment uppercase leading-tight [text-wrap:balance]">
          Together With Their Families
        </h2>
        <p className="mt-2 font-display text-base sm:text-lg tracking-[0.16em] text-gold uppercase">
          Bhosale &amp; Sangle Family
        </p>
        <div className="gold-rule mx-auto mt-4 w-24" />
      </RevealOnScroll>

      <div className="relative mx-auto mt-12 max-w-lg">
        <div className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent sm:left-1/2" />

        <div className="space-y-14">
          {[bride, groom].map((family, idx) => (
            <RevealOnScroll key={family.label} delay={idx * 0.08}>
              <article className="relative pl-16 sm:pl-0">
                <span className="absolute top-6 left-6 z-10 block size-2 -translate-x-1/2 rotate-45 bg-gold sm:left-1/2" />

                <div
                  className={`sm:flex sm:items-center sm:gap-6 ${
                    idx % 2 ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <div className="sm:w-1/2">
                    <div className="relative overflow-hidden rounded-t-[3rem] border border-gold/70 bg-parchment px-6 pt-14 pb-8 text-center shadow-[0_18px_40px_-24px_black]">
                      <div className="pointer-events-none absolute inset-x-2 top-2 bottom-2 rounded-t-[2.6rem] border border-gold/30" />
                      <p className="relative text-[0.6rem] tracking-[0.35em] text-gold uppercase">
                        {family.label}
                      </p>
                      <p className="relative mt-3 font-display text-3xl text-royal">
                        {family.name}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`mt-4 sm:mt-0 sm:w-1/2 ${
                      idx % 2 ? 'sm:text-right' : ''
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-parchment/90">
                      {family.parents}
                    </p>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
