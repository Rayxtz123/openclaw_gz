'use client'

import { allPosts } from 'contentlayer/generated'
import { format } from 'date-fns'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'

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

const categoryColors: Record<string, string> = {
  finance: 'bg-finance/10 text-finance',
  travel: 'bg-travel/10 text-travel',
  ai: 'bg-ai/10 text-ai',
  work: 'bg-work/10 text-work',
  thinking: 'bg-thinking/10 text-thinking',
  reading: 'bg-reading/10 text-reading',
  resource: 'bg-resource/10 text-resource',
  life: 'bg-life/10 text-life',
}

export default function PostPage() {
  const params = useParams()
  const slugParts = params?.slug as string[] || []
  const slug = slugParts.join('/')
  
  const post = allPosts.find((p) => p._raw.flattenedPath === slug)

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600">← 返回首页</Link>
        <p className="mt-4">文章未找到</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        返回首页
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category] || 'bg-gray-100'}`}>
            {categoryNames[post.category] || post.category}
          </span>
          {post.subcategory && (
            <span className="text-gray-400">/ {post.subcategory}</span>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
          {post.author && <span>👤 {post.author}</span>}
          <a
            href={post.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
          >
            查看原文
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body.html || '' }}
      />

      <footer className="mt-12 pt-8 border-t text-gray-500 text-sm">
        <p>📌 由墨白整理收录</p>
      </footer>
    </main>
  )
}
