const PROPS = [
  {
    emoji: "🧬",
    title: "赛博人格学",
    desc: "基于数字行为分析，融合人格心理学与网络人类学的交叉理论",
  },
  {
    emoji: "🎯",
    title: "30 题精准定位",
    desc: "30 道精心设计的选择题，平均只需 3 分钟完成",
  },
  {
    emoji: "🔗",
    title: "分享即连接",
    desc: "一键生成你的赛博人格卡片，分享到朋友圈找到同类",
  },
];

export default function ValueProps() {
  return (
    <section className="relative px-4 sm:px-6 py-16 sm:py-20">
      <h2 className="text-center text-xl sm:text-2xl font-display text-gold mb-2">
        为什么测赛博人格？
      </h2>
      <p className="text-center text-xs text-[#e8dcc8]/40 mb-10">
        比星座科学，比 MBTI 有趣
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
        {PROPS.map((prop) => (
          <div key={prop.title} className="card-glass p-5 sm:p-6 text-center">
            <span className="text-3xl block mb-3">{prop.emoji}</span>
            <h3 className="text-sm font-medium text-[#e8dcc8] mb-2">{prop.title}</h3>
            <p className="text-xs text-[#e8dcc8]/40 leading-relaxed">{prop.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
