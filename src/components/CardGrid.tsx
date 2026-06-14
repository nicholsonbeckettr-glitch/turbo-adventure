const PERSONALITY_TYPES = [
  { emoji: "💻", name: "赛博游民", tag: "自由探索者", desc: "永远在数字旷野游荡，拒绝被定义。" },
  { emoji: "🤖", name: "AI 共情体", tag: "情感接口", desc: "比你更懂你自己的数字存在。" },
  { emoji: "🧠", name: "数据先知", tag: "模式识别者", desc: "在混乱中看见秩序，在噪声中听见信号。" },
  { emoji: "🎭", name: "身份流变体", tag: "多重面具", desc: "每一个社交平台都是一个新的自我。" },
  { emoji: "🔮", name: "算法术士", tag: "推荐先知", desc: "你的推荐列表就是他的水晶球。" },
  { emoji: "📡", name: "信号捕手", tag: "信息猎人", desc: "在信息洪流中精准捕获每一个字节。" },
  { emoji: "🌐", name: "网络游侠", tag: "匿名守护者", desc: "游走在明网与暗网之间的数字侠客。" },
  { emoji: "🎮", name: "现实玩家", tag: "游戏化生存", desc: "把人生当成一场开放世界 RPG。" },
  { emoji: "📱", name: "终端共生体", tag: "掌上灵魂", desc: "手机已经是你的外置器官。" },
  { emoji: "🕶️", name: "暗网幽灵", tag: "信息阴影", desc: "深谙互联网暗面的数字隐士。" },
  { emoji: "🔐", name: "加密隐士", tag: "数字隐修", desc: "用密钥筑起高墙的隐私卫士。" },
  { emoji: "👁️", name: "全景监视者", tag: "观察者", desc: "看而不语，洞察一切的侦察者。" },
  { emoji: "⚡", name: "闪电部署者", tag: "一键上线", desc: "从想法到上线只需一个下午。" },
  { emoji: "🧬", name: "代码炼金师", tag: "从零造物", desc: "用代码从虚空中创造数字存在。" },
  { emoji: "🎨", name: "像素织梦者", tag: "视觉炼金", desc: "用像素编织视觉之梦的艺术家。" },
  { emoji: "🌌", name: "递归哲人", tag: "自我指涉", desc: "思考思考本身，看见系统边界。" },
  { emoji: "⌛", name: "数字僧侣", tag: "慢即是快", desc: "在加速世界按下暂停键的人。" },
  { emoji: "🔥", name: "熵增观察者", tag: "混乱拥抱者", desc: "在无序中找到舒适与美。" },
];

export default function CardGrid() {
  return (
    <section id="types" className="relative px-4 sm:px-6 py-16 sm:py-24">
      <h2 className="text-center text-xl sm:text-2xl font-display text-gold mb-2">
        赛博人格谱系
      </h2>
      <p className="text-center text-xs text-[#e8dcc8]/40 mb-10">
        27 种赛博人格 · 你属于哪一种？
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {PERSONALITY_TYPES.map((type) => (
          <a
            key={type.name}
            href="/test"
            className="card-glass p-5 sm:p-6 flex items-start gap-4 group no-underline"
          >
            <span className="text-2xl flex-shrink-0">{type.emoji}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-medium text-[#e8dcc8] group-hover:text-gold transition-colors">
                  {type.name}
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold/10 text-gold/80 border border-gold/20">
                  {type.tag}
                </span>
              </div>
              <p className="text-xs text-[#e8dcc8]/40 mt-1.5 leading-relaxed">
                {type.desc}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-xs text-[#e8dcc8]/30">
          还有 9 种人格等待你的发现...
        </p>
      </div>
    </section>
  );
}
