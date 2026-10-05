import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2 } from 'lucide-react';
import { audioService } from '../services/audio';
import { useGate } from '../context/GateContext';

export function AudioFloatingButton() {
  const isOpened = useGate();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const update = () => setIsPlaying(audioService.isPlaying());
    update();
    return audioService.subscribe(update);
  }, []);

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.button
          type="button"
          onClick={audioService.toggle}
          aria-label={isPlaying ? 'Turn music off' : 'Turn music on'}
          aria-pressed={isPlaying}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.92 }}
          className="fixed right-4 bottom-5 z-40 grid size-12 cursor-pointer place-items-center rounded-full border border-gold/80 bg-gradient-to-b from-royal to-royal-deep text-gold shadow-[0_10px_24px_-8px_var(--color-royal-deep)]"
        >
          {isPlaying &&
            [0, 1].map((ringIndex) => (
              <motion.span
                key={ringIndex}
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-gold"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.75, opacity: 0 }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: ringIndex * 1.1,
                  ease: 'easeOut',
                }}
              />
            ))}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[3px] rounded-full border border-gold/30"
          />

          <motion.span
            animate={
              isPlaying
                ? { rotate: [-10, 10, -10], y: [0, -1.5, 0] }
                : { rotate: 0, y: 0 }
            }
            transition={
              isPlaying
                ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            className="relative"
          >
            <Music2
              className={`size-5 transition-opacity ${
                isPlaying ? 'opacity-100' : 'opacity-60'
              }`}
              strokeWidth={1.8}
            />
          </motion.span>

          <span
            aria-hidden="true"
            className={`pointer-events-none absolute h-[1.5px] w-7 -rotate-45 rounded-full bg-gold transition-opacity ${
              isPlaying ? 'opacity-0' : 'opacity-90'
            }`}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
