import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Rayx 的笔记库",
  description: "个人知识管理与内容收藏系统，由墨白自动整理",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
