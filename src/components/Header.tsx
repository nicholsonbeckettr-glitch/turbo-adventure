export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between" style={{ paddingTop: "env(safe-area-inset-top, 16px)" }}>
      <span className="text-gold text-sm tracking-wider opacity-80">赛博人格</span>
      <a href="#start" className="text-xs px-4 py-1.5 rounded-full border border-gold/30 text-gold/80 hover:bg-gold/10 transition-colors">
        开始测试
      </a>
    </header>
  );
}
