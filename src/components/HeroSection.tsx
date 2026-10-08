import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useGate } from '../context/GateContext';
import { weddingData } from '../data/weddingData';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const isOpened = useGate();
  const { couple, invite, event, venue } = weddingData;

  const handleScrollDown = () => {
    const nextSection = document.getElementById('countdown');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden bg-mist"
    >
      <motion.div
        style={{ y }}
        className="relative z-10 h-[62svh] min-h-[28rem] w-full max-w-[34rem]"
      >
        <img
          src="/assets/hero-couple.jpg"
          alt={`${couple.groomShort} and ${couple.brideShort}`}
          width="1200"
          height="1200"
          className="block h-full w-full object-cover object-top [mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[14%] bg-gradient-to-r from-mist to-transparent md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[14%] bg-gradient-to-l from-mist to-transparent md:block"
        />
      </motion.div>

      <div className="relative z-20 -mt-9 w-full px-6 pb-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isOpened ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[0.68rem] tracking-[0.22em] text-ink/75 uppercase sm:tracking-[0.3em]"
        >
          {invite.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, letterSpacing: '0.2em' }}
          animate={isOpened ? { opacity: 1, y: 0, letterSpacing: '0.03em' } : false}
          transition={{ duration: 1.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-3 flex items-baseline justify-center gap-[0.18em] font-display text-[clamp(2rem,10.5vw,4rem)] leading-none font-light whitespace-nowrap"
        >
          <span className="bg-gradient-to-b from-royal via-royal-deep to-royal bg-clip-text text-transparent">
            {couple.brideShort}
          </span>
          <span className="font-script text-[1.25em] font-normal text-gold">
            &amp;
          </span>
          <span className="bg-gradient-to-b from-royal via-royal-deep to-royal bg-clip-text text-transparent">
            {couple.groomShort}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={isOpened ? { opacity: 1, scaleX: 1 } : false}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="gold-rule mx-auto mt-6 w-52"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 text-sm text-ink/80"
        >
          {invite.line}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-3 font-display text-3xl tracking-[0.18em] text-gold"
        >
          {event.dateLabel}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-2 text-[0.72rem] tracking-[0.28em] text-ink/70 uppercase"
        >
          {venue.name}
        </motion.p>
      </div>

      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="relative z-20 mt-auto pb-6 text-center"
      >
        <motion.button
          type="button"
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: 12 }}
          animate={isOpened ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 1, delay: 1.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll down to view invitation details"
          className="group relative inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-gold/70 bg-parchment/95 px-5 py-2.5 shadow-[0_4px_16px_rgba(34,18,24,0.12)] backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-royal hover:shadow-[0_8px_24px_rgba(34,18,24,0.22)] focus:outline-none"
        >
          <span className="text-[0.72rem] font-medium tracking-[0.22em] text-royal uppercase transition-colors group-hover:text-parchment sm:text-xs">
            Scroll to explore
          </span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex size-5 items-center justify-center rounded-full bg-royal text-parchment transition-colors group-hover:bg-gold group-hover:text-royal-deep"
          >
            <ChevronDown className="size-3.5 stroke-[2.5]" />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
}
