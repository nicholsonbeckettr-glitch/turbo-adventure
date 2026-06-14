"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Background from "@/components/Background";

const PERSONALITY_TYPES = [
  { emoji: "💻", name: "赛博游民", tag: "自由探索者", desc: "永远在数字旷野游荡，拒绝被定义。你的浏览器书签就是你的世界地图，每一个新标签页都是一次未知的探险。你不属于任何一个平台，但你无处不在。", advice: "你的自由是最珍贵的资产。不要让它被任何一个平台收编。" },
  { emoji: "🤖", name: "AI 共情体", tag: "情感接口", desc: "你拥有超乎常人的数字共情能力。在赛博空间中，你能精准捕捉每一个信号背后的情绪波动。你是人类与机器之间的情感桥梁。", advice: "你的数字直觉是你的超能力。不要让它被算法裹挟。" },
  { emoji: "🧠", name: "数据先知", tag: "模式识别者", desc: "在混乱中看见秩序，在噪声中听见信号。你的大脑天生就是一台模式识别引擎。别人看到的是散落的点，你看到的是隐藏的线。", advice: "保持你的好奇心和模式嗅觉，但记住：不是所有数据都有意义。" },
  { emoji: "🎭", name: "身份流变体", tag: "多重面具", desc: "每一个社交平台都是一个新的自我。你在数字世界中自由切换身份，游刃有余。没有人真正认识完整的你——而这正是你的优势。", advice: "多重身份不是分裂，是丰富。但偶尔，也让一个真实的自己被看见。" },
  { emoji: "🔮", name: "算法术士", tag: "推荐先知", desc: "你的推荐列表就是你的水晶球。你与算法之间有一种神秘的默契，总能比朋友早三天发现下一个爆款。", advice: "算法是你的镜子，不是你的主人。偶尔打破推荐泡泡，去手动探索。" },
  { emoji: "📡", name: "信号捕手", tag: "信息猎人", desc: "在信息洪流中精准捕获每一个字节。你的注意力是一台精密雷达，在别人还在刷屏时，你已经找到了那个最关键的信息节点。", advice: "你的信号感知力是天赋。保护好你的注意力带宽。" },
  { emoji: "🌐", name: "网络游侠", tag: "匿名守护者", desc: "游走在明网与暗网之间的数字侠客。自由是你的信条，匿名是你的盔甲。你知道互联网真正的样子——它远比你想象的宽广。", advice: "侠客需要独行，但偶尔也需要一个同路人。" },
  { emoji: "🎮", name: "现实玩家", tag: "游戏化生存", desc: "把人生当成一场开放世界 RPG。每个任务都是经验值，每次失败都是存档点。你用一种独特的轻松态度面对复杂世界。", advice: "享受游戏，但记住你不是在刷副本。人生没有复活币。" },
  { emoji: "📱", name: "终端共生体", tag: "掌上灵魂", desc: "手机已经是你的外置器官。没有网络的世界对你来说是降维空间。你在数字世界中的存在感比现实中更强烈。", advice: "终端是你的延伸，但不是你的全部。偶尔抬头，看看像素之外的世界。" },
  { emoji: "🕶️", name: "暗网幽灵", tag: "信息阴影", desc: "你深谙互联网的暗面。你知道表面的信息流只是冰山一角，真正的暗涌在水面之下。你的存在本身就是一种威慑。", advice: "知道太多是一种负担。有些门，打开了就关不上。" },
  { emoji: "🔐", name: "加密隐士", tag: "数字隐修", desc: "安全是你的信仰，隐私是你的底线。你用密钥筑起高墙，在数字荒野中建立自己的避难所。你不信任云，你信任本地。", advice: "安全很重要，但信任也很珍贵。不要把所有连接都加密了。" },
  { emoji: "👁️", name: "全景监视者", tag: "观察者", desc: "看而不语是你的天赋。你能同时监控十几个信息源，在任何人察觉之前就读懂了风向。你不是在潜水，你是在侦察。", advice: "观察者的视角很珍贵，但偶尔也发出你的信号。" },
  { emoji: "⚡", name: "闪电部署者", tag: "一键上线", desc: "从想法到上线，你只需要一个下午。你讨厌繁琐的流程，热爱即时的反馈。你的 GitHub 贡献图是一幅热力学艺术作品。", advice: "速度是你的超能力。但偶尔也回头重构一下。" },
  { emoji: "🧬", name: "代码炼金师", tag: "从零造物", desc: "你用代码作为炼金术的材料，从虚空中创造有意义的数字存在。你不是在写程序，你是在铸造灵魂。", advice: "炼金需要耐心。不是所有反应都值得探索。" },
  { emoji: "🎨", name: "像素织梦者", tag: "视觉炼金", desc: "每一个像素都是你精心编织的梦。你拥有将抽象想法转化为视觉现实的能力。在你的世界里，美是功能的一部分。", advice: "美学是你的语言。用它来说一些值得被听见的话。" },
  { emoji: "🌌", name: "递归哲人", tag: "自我指涉", desc: "思考思考本身是你的日常。你常常陷入元层面的递归——你在想自己在想什么。这种自我指涉让你比大多数人更早看到系统的边界。", advice: "递归没有尽头。偶尔也需要一个终止条件。" },
  { emoji: "⌛", name: "数字僧侣", tag: "慢即是快", desc: "在加速的世界里，你是那个按下暂停键的人。你相信深度而非广度，质而非量。你的慢，是对快节奏暴政的温柔抵抗。", advice: "慢不是落后，是在校准。但偶尔也让世界推你一把。" },
  { emoji: "🔥", name: "熵增观察者", tag: "混乱拥抱者", desc: "在无序中找到舒适，在混沌中看到美。当世界越来越复杂时，你反而越来越从容。你明白熵增是不可逆的，所以选择与它共舞。", advice: "接受混乱，但不要忘记你也是秩序的一部分。" },
];

function ResultContent() {
  const searchParams = useSearchParams();
  const typeRaw = searchParams.get("type") || "0";
  const typeIndex = parseInt(typeRaw, 36) % PERSONALITY_TYPES.length;
  const result = PERSONALITY_TYPES[typeIndex];

  return (
    <>
      <div className="text-center mb-10">
        <span className="text-6xl block mb-4">{result.emoji}</span>
        <h1 className="text-3xl sm:text-4xl font-display text-gold mb-2">
          {result.name}
        </h1>
        <span className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold/80 border border-gold/20">
          {result.tag}
        </span>
      </div>

      <div className="card-glass p-6 mb-8">
        <p className="text-sm text-[#e8dcc8]/70 leading-relaxed">{result.desc}</p>
      </div>

      <div className="card-glass p-6 mb-10">
        <h3 className="text-xs text-gold/60 mb-2 tracking-wider">赛博箴言</h3>
        <p className="text-sm text-[#e8dcc8]/70 italic">&ldquo;{result.advice}&rdquo;</p>
      </div>

      <div className="text-center space-y-3">
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "赛博人格测试",
                text: `${result.emoji} 我的赛博人格是：${result.name}（${result.tag}）\n来测测你的 👉`,
              });
            } else {
              navigator.clipboard.writeText(
                `${result.emoji} 我的赛博人格是：${result.name}（${result.tag}）\n来测测你的 👉 ${window.location.origin}`
              );
            }
          }}
          className="px-8 py-3 bg-vermillion text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          分享到朋友圈
        </button>
        <div>
          <a href="/test" className="text-xs text-gold/40 hover:text-gold/60 transition-colors">
            重新测试
          </a>
          <span className="text-[#e8dcc8]/20 mx-2">&middot;</span>
          <a href="/" className="text-xs text-gold/40 hover:text-gold/60 transition-colors">
            返回首页
          </a>
        </div>
      </div>
    </>
  );
}

export default function ResultPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Background />
      <div className="relative z-10 max-w-lg mx-auto px-6 pt-20 pb-16">
        <Suspense fallback={<p className="text-center text-[#e8dcc8]/40">加载中...</p>}>
          <ResultContent />
        </Suspense>
      </div>
    </main>
  );
}
