'use client'

import { useState } from 'react'
import { allPosts } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import { 
  Wallet, Plane, Bot, Briefcase, Brain, BookOpen, Package, Leaf,
  ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react'

const categoryIcons: Record<string, React.ReactNode> = {
  finance: <Wallet className="w-6 h-6" />,
  travel: <Plane className="w-6 h-6" />,
  ai: <Bot className="w-6 h-6" />,
  work: <Briefcase className="w-6 h-6" />,
  thinking: <Brain className="w-6 h-6" />,
  reading: <BookOpen className="w-6 h-6" />,
  resource: <Package className="w-6 h-6" />,
  life: <Leaf className="w-6 h-6" />,
}

const categoryColors: Record<string, string> = {
  finance: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  travel: 'bg-blue-100 text-blue-700 border-blue-200',
  ai: 'bg-purple-100 text-purple-700 border-purple-200',
  work: 'bg-amber-100 text-amber-700 border-amber-200',
  thinking: 'bg-pink-100 text-pink-700 border-pink-200',
  reading: 'bg-teal-100 text-teal-700 border-teal-200',
  resource: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  life: 'bg-lime-100 text-lime-700 border-lime-200',
}

const categoryNames: Record<string, string> = {
  finance: '金融',
  travel: '旅行',
  ai: 'AI',
  work: '工作',
  thinking: '思考',
  reading: '阅读',
  resource: '资源',
  life: '生活',
}

function PostCard({ post }: { post: any }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="bg-white rounded-xl shadow-sm border overflow-hidden">
      {/* 标题区 - 始终显示 */}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[post.category]}`}>
                {categoryNames[post.category]}
              </span>
              <span className="text-gray-400 text-sm">{format(new Date(post.date), 'yyyy-MM-dd')}</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h3>
            
            {post.summary && (
              <p className="text-gray-600 text-sm line-clamp-2">{post.summary}</p>
            )}
            
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span>👤 {post.author}</span>
              {post.tags?.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">#{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="text-gray-400">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* 展开内容 */}
      {expanded && (
        <div className="border-t px-6 py-6 bg-gray-50">
          {/* 原文链接 */}
          <div className="mb-6">
            <a
              href={post.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              查看原文
            </a>
          </div>

          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white text-gray-600 rounded-full text-sm border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 全文内容 */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />

          <div className="mt-6 pt-4 border-t text-gray-400 text-sm">
            📌 由墨白整理收录
          </div>
        </div>
      )}
    </article>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) => 
    compareDesc(new Date(a.date), new Date(b.date))
  )

  const stats = {
    total: posts.length,
    byCategory: posts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1
      return acc
    }, {} as Record<string, number>),
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3">Rayx 的笔记库</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          个人知识管理与内容收藏系统，由 AI 助手「墨白」自动整理
        </p>
      </header>

      {/* 分类统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {Object.entries(categoryNames).map(([key, name]) => (
          <div
            key={key}
            className={`p-5 rounded-xl border-2 ${categoryColors[key]}`}
          >
            <div className="flex items-center gap-3 mb-3">
              {categoryIcons[key]}
              <span className="font-semibold">{name}</span>
            </div>
            <div className="text-3xl font-bold">{stats.byCategory[key] || 0}</div>
            <div className="text-sm opacity-70">篇文章</div>
          </div>
        ))}
      </div>

      {/* 文章列表 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>最新内容</span>
          <span className="text-sm font-normal text-gray-400">({posts.length} 篇)</span>
        </h2>
        
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </main>
  )
}
