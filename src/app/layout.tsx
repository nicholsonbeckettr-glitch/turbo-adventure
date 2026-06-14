import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "赛博人格测试 · 你是哪种赛博人格？",
  description: "30道题解锁你的赛博人格类型，看看你是哪种数字灵魂",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
