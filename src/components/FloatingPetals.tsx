const PETALS = Array.from({ length: 8 }, (_, r) => ({
  left: (r * 13 + (r % 3) * 4) % 94,
  size: 10 + ((r * 5) % 12),
  dur: 22 + ((r * 5) % 16),
  delay: -(r * 3.6),
  drift: (r % 2 === 0 ? 1 : -1) * (30 + ((r * 11) % 70)),
  opacity: 0.14 + (r % 3) * 0.05,
}));

export function FloatingPetals() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {PETALS.map((petal, idx) => (
        <img
          key={idx}
          src="/assets/lotus.png"
          alt=""
          className="petal absolute top-0"
          style={
            {
              left: `${petal.left}%`,
              width: petal.size,
              height: petal.size,
              opacity: petal.opacity,
              '--dur': `${petal.dur}s`,
              '--delay': `${petal.delay}s`,
              '--drift': `${petal.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
