import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from './RevealOnScroll';
import { weddingData } from '../data/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const COUNTDOWN_ITEMS = [
  { key: 'days', label: 'days' },
  { key: 'hours', label: 'hours' },
  { key: 'minutes', label: 'min' },
  { key: 'seconds', label: 'sec' },
] as const;

function calculateTimeLeft(): TimeLeft {
  const diff = new Date(weddingData.event.startsAt).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor(diff / 36e5) % 24,
    minutes: Math.floor(diff / 6e4) % 60,
    seconds: Math.floor(diff / 1e3) % 60,
    done: false,
  };
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { event } = weddingData;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-royal-deep via-royal to-royal-deep px-5 py-20">
      <div aria-hidden="true" className="jaali absolute inset-0 opacity-[0.12]" />

      <RevealOnScroll className="relative mx-auto max-w-lg text-center">
        <p className="text-[0.65rem] tracking-[0.4em] text-gold-soft uppercase">
          {timeLeft?.done ? 'Today is the day' : 'Counting down to the engagement'}
        </p>

        <div className="gold-rule mx-auto mt-5 w-32" />

        <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
          {COUNTDOWN_ITEMS.map(({ key, label }) => (
            <div
              key={key}
              className="relative overflow-hidden rounded-t-[2.2rem] border border-gold/60 bg-royal-deep/70 px-1 py-5 shadow-[0_10px_30px_-18px_black] backdrop-blur-[1px]"
            >
              <div className="pointer-events-none absolute inset-x-2 top-2 h-8 rounded-t-[1.8rem] border border-gold/25" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`${key}-${timeLeft?.[key] ?? '-'}`}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-display text-3xl tabular-nums text-parchment sm:text-4xl"
                >
                  {timeLeft ? String(timeLeft[key]).padStart(2, '0') : '--'}
                </motion.span>
              </AnimatePresence>
              <span className="mt-2 block text-[0.55rem] tracking-[0.25em] text-gold-soft uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 font-display text-lg italic text-parchment/85">
          {event.dayLabel}, {event.timeLabel}
        </p>
      </RevealOnScroll>
    </section>
  );
}
