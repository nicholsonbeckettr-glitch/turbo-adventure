export default function Hero() {
  return (
    <section id="start" className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-6 text-center">
      {/* Gold ring icon */}
      <div className="mx-auto mb-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold/40 animate-ring-spin flex items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gold/30 flex items-center justify-center">
          <span className="text-gold text-2xl">🧬</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-gold mb-4 animate-fade-in-up">
        赛博人格测试
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-[#e8dcc8]/60 max-w-md mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        30 道题，解锁你的数字灵魂。<br />
        看看你是赛博空间的哪种存在。
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <a
          href="/test"
          className="px-8 py-3 bg-vermillion text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          开始测试
        </a>
        <a
          href="#types"
          className="px-8 py-3 border border-gold/30 text-gold/80 rounded-full text-sm hover:bg-gold/10 transition-colors"
        >
          浏览人格类型
        </a>
      </div>

      {/* Down arrow hint */}
      <div className="mt-16 text-gold/20 text-xs animate-pulse">
        ↓ 向下探索
      </div>
    </section>
  );
}
