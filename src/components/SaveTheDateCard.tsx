import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from './RevealOnScroll';
import { weddingData } from '../data/weddingData';

const BRUSH_SIZE = 26;
const REVEAL_THRESHOLD = 0.45;

function drawFoil(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#b98c3a');
  gradient.addColorStop(0.3, '#ecd18a');
  gradient.addColorStop(0.55, '#c9a04c');
  gradient.addColorStop(0.8, '#f2dfa2');
  gradient.addColorStop(1, '#b58432');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.lineWidth = 0.8;
  for (let x = -height; x < width + height; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.moveTo(x + height, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  ctx.fillStyle = '#6d4d12';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `600 ${Math.max(12, width * 0.05)}px Karla, sans-serif`;
  ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 - 10);

  ctx.font = `italic 400 ${Math.max(14, width * 0.06)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText('the date', width / 2, height / 2 + 16);
}

export function SaveTheDateCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratching = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const moveCount = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    drawFoil(canvas);

    const observer = new ResizeObserver(() => drawFoil(canvas));
    observer.observe(canvas);

    document.fonts?.ready.then(() => drawFoil(canvas));
    return () => observer.disconnect();
  }, [revealed]);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 64) {
      total++;
      if (data[i] === 0) transparent++;
    }
    return transparent / total;
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching.current || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = BRUSH_SIZE;
    ctx.beginPath();
    ctx.moveTo(lastPos.current?.x ?? x, lastPos.current?.y ?? y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPos.current = { x, y };

    if (++moveCount.current % 6 === 0 && checkScratchPercentage() > REVEAL_THRESHOLD) {
      setRevealed(true);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isScratching.current = true;
    lastPos.current = null;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    isScratching.current = false;
    lastPos.current = null;
    if (!revealed && canvasRef.current && checkScratchPercentage() > REVEAL_THRESHOLD) {
      setRevealed(true);
    }
  };

  const { event } = weddingData;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-mist-deep px-5 py-16">
      <RevealOnScroll className="mx-auto max-w-md text-center">
        <h2 className="font-display text-3xl tracking-[0.14em] text-royal uppercase">
          Save the Date
        </h2>
        <div className="gold-rule mx-auto mt-4 w-24" />
        <p className="mt-5 font-display text-lg text-ink/70 italic">
          Scratch the card to reveal our special day
        </p>

        <div className="relative mx-auto mt-8 h-56 w-full max-w-sm overflow-hidden rounded-t-[7rem] rounded-b-2xl border border-gold/70 bg-parchment shadow-[0_24px_50px_-30px_var(--color-royal-deep)]">
          <div className="paper-grain absolute inset-0 flex flex-col items-center justify-center px-6 pt-6 text-center">
            <p className="text-[0.6rem] tracking-[0.4em] text-ink/60 uppercase">
              The Engagement
            </p>
            <p className="mt-2 font-display text-4xl tracking-[0.12em] text-royal">
              {event.dateLabel}
            </p>
            <div className="gold-rule mt-3 w-28" />
            <p className="mt-3 font-display text-lg text-ink/75 italic">
              {event.dayLabel}, {event.timeLabel}
            </p>
          </div>

          <AnimatePresence>
            {!revealed && (
              <motion.canvas
                key="foil"
                ref={canvasRef}
                role="img"
                aria-label="Scratch card covering the date"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
              />
            )}
          </AnimatePresence>

          <span className="pointer-events-none absolute inset-2 rounded-t-[6.6rem] rounded-b-xl border border-gold/40" />
        </div>

        {!revealed && (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-4 cursor-pointer text-[0.6rem] tracking-[0.3em] text-ink/50 uppercase underline-offset-4 hover:text-royal hover:underline"
          >
            or tap to reveal
          </button>
        )}
      </RevealOnScroll>
    </section>
  );
}
