"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Background from "@/components/Background";

const QUESTIONS = [
  { id: 1, text: "周末晚上，你会选择？", options: ["独自在家看一部冷门科幻电影", "约几个好友去新开的隐蔽酒吧", "刷社交媒体直到凌晨三点", "用 AI 工具做一个奇怪的小项目"] },
  { id: 2, text: "你的浏览器标签页通常是？", options: ["永远只开不超过 5 个", "几十个标签页同时存活", "用完就关，像禅修一样干净", "按主题分组，井井有条"] },
  { id: 3, text: "面对一个新 App，你倾向于？", options: ["先读完所有功能介绍再动手", "直接下载，边用边探索", "看一圈评价再决定", "分析它的技术栈和设计模式"] },
  { id: 4, text: "你如何描述自己的社交能量？", options: ["独处时充电，社交是消耗", "人群让我兴奋，越多人越嗨", "取决于对谁、在哪、什么时候", "我在网上比在现实中更活跃"] },
  { id: 5, text: "当朋友向你倾诉烦恼时？", options: ["提供具体可执行的解决方案", "先共情，再慢慢引导", "分享自己类似的经历", "推荐相关的文章/工具/资源"] },
  { id: 6, text: "Deadline 前 24 小时，你是？", options: ["早已完成，正在优化细节", "进入心流，效率爆表", "开始焦虑但勉强完成", "决定这个 deadline 不合理，要求延期"] },
  { id: 7, text: "你的手机桌面是？", options: ["只有系统自带应用，极致简洁", "按颜色分类，强迫症友好", "堆满各种效率工具和小部件", "乱中有序，只有自己找得到"] },
  { id: 8, text: "AI 对你来说是什么？", options: ["效率工具，帮我省时间", "创作伙伴，和我一起碰撞想法", "一个值得深入理解的黑箱", "算不上什么，我自己写模型"] },
  { id: 9, text: "看到一条热门微博时，你是？", options: ["先看评论区再决定态度", "转发前先独立查证事实", "顺手转发，跟着大家一起嗨", "默默围观，从不参与"] },
  { id: 10, text: "你的密码管理方式是？", options: ["三组密码轮换，全凭记忆", "密码管理器，每个网站独立随机", "能不改默认密码就不改", "全部不同，并且每周手动更换"] },
];

export default function TestPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      router.push(`/result?type=${newAnswers.join("")}`);
    }
  };

  const progress = (step / QUESTIONS.length) * 100;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Background />
      <div className="relative z-10 max-w-lg mx-auto px-6 pt-24 pb-16">
        <div className="w-full h-0.5 bg-white/5 rounded mb-12">
          <div
            className="h-full bg-gold/50 rounded transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-gold/40 mb-8 text-center tracking-widest">
          {step + 1} / {QUESTIONS.length}
        </p>

        <h2 className="text-lg sm:text-xl font-medium text-[#e8dcc8] text-center mb-10 leading-relaxed">
          {QUESTIONS[step].text}
        </h2>

        <div className="space-y-3">
          {QUESTIONS[step].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="w-full text-left card-glass px-5 py-4 text-sm text-[#e8dcc8]/80 hover:text-[#e8dcc8] hover:border-gold/30 transition-all cursor-pointer"
            >
              <span className="text-gold/40 mr-3 text-xs">{String.fromCharCode(65 + i)}</span>
              {option}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
