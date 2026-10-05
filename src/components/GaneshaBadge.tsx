import React from 'react';

interface GaneshaBadgeProps {
  className?: string;
}

export function GaneshaBadge({ className = "size-20" }: GaneshaBadgeProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border border-gold/80 bg-gradient-to-b from-royal to-royal-deep shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-gold)_20%,transparent),0_10px_28px_-12px_var(--color-royal-deep)] ${className}`}
    >
      <img
        src="/assets/ganesha.png"
        alt="Lord Ganesha"
        width="348"
        height="460"
        className="h-[72%] w-auto drop-shadow-[0_0_4px_rgb(228_201_126/0.45)]"
      />
      <span className="pointer-events-none absolute inset-[3px] rounded-full border border-gold/30" />
    </span>
  );
}
