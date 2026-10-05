import { motion } from 'framer-motion';
import { GaneshaBadge } from './GaneshaBadge';
import { weddingData } from '../data/weddingData';

const EASE_GATE = [0.83, 0, 0.17, 1] as const;

interface GateOpeningProps {
  opened: boolean;
  onOpen: () => void;
}

export function GateOpening({ opened, onOpen }: GateOpeningProps) {
  const { couple, invite, event } = weddingData;

  return (
    <motion.div
      className="fixed inset-0 z-[60]"
      style={{ pointerEvents: opened ? 'none' : 'auto' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {(['left', 'right'] as const).map((side) => (
        <motion.div
          key={side}
          initial={{ x: 0 }}
          animate={{ x: opened ? (side === 'left' ? '-101%' : '101%') : 0 }}
          transition={{ duration: 1.6, ease: EASE_GATE }}
          className={`absolute top-0 h-full w-1/2 overflow-hidden bg-royal-deep ${
            side === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/assets/gate-panel-theme.jpg)',
              backgroundSize: '200% 100%',
              backgroundPosition: side === 'left' ? 'left center' : 'right center',
            }}
          />
          <div className="absolute inset-0 bg-royal mix-blend-color" />
          <div className="absolute inset-0 bg-royal-deep/35" />
          <div
            className="jaali absolute inset-0 opacity-25"
            style={{
              backgroundPosition: side === 'left' ? 'left center' : 'right center',
            }}
          />
          <div
            className={`absolute inset-y-0 w-px bg-gold/60 ${
              side === 'left' ? 'right-0' : 'left-0'
            }`}
          />
          <div className="absolute inset-4 rounded-[2rem] border border-gold/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
        </motion.div>
      ))}

      <motion.div
        animate={{ opacity: opened ? 0 : 1, scale: opened ? 1.14 : 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <GaneshaBadge className="size-20" />
          <p className="mt-3 font-display text-lg tracking-[0.14em] text-gold">
            ॥ Shree Ganesha Namah ॥
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-7 text-[0.62rem] tracking-[0.45em] text-gold uppercase"
        >
          {invite.kicker}
        </motion.p>

        <div className="relative mt-6 flex h-40 w-40 items-center justify-center">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-gold/45"
          />
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: EASE_GATE }}
            className="absolute inset-4 rounded-full border border-gold/70 bg-parchment/10 backdrop-blur-[2px]"
          />
          <motion.span
            animate={{ scale: [1, 1.16, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-4 rounded-full border border-gold"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <img
              src="/assets/sp-monogram.png"
              alt="Sayali & Pranav Monogram Logo"
              width="80"
              height="80"
              className="h-[4.75rem] w-[4.75rem] object-contain drop-shadow-[0_2px_8px_rgba(203,168,124,0.35)]"
            />
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
          transition={{ duration: 1.5, delay: 0.6, ease: EASE_GATE }}
          className="mt-9 text-lg font-light text-parchment uppercase sm:text-xl"
        >
          {couple.brideShort} &amp; {couple.groomShort}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-3 font-display text-base tracking-[0.3em] text-gold"
        >
          {event.dateLabel}
        </motion.p>

        <motion.button
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileTap={{ scale: 0.96 }}
          className="group relative mt-12 cursor-pointer overflow-hidden rounded-full border border-gold/70 px-9 py-3.5 text-[0.62rem] tracking-[0.35em] text-parchment uppercase transition-colors hover:bg-gold/15"
        >
          <motion.span
            animate={{ x: ['-120%', '120%'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-parchment/25 to-transparent"
          />
          <span className="relative">Open the invitation</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
