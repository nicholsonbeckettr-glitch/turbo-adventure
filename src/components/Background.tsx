export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-bg" />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-hero-gradient" />
      {/* Gold particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/40 animate-glow-rise"
          style={{
            left: `${8 + Math.random() * 84}%`,
            top: `${20 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}
