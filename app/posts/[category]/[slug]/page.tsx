import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

interface PostPageProps {
  params: {
    category: string
    slug: string
  }
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

const categoryColors: Record<string, string> = {
  finance: 'bg-emerald-100 text-emerald-700',
  travel: 'bg-blue-100 text-blue-700',
  ai: 'bg-purple-100 text-purple-700',
  work: 'bg-amber-100 text-amber-700',
  thinking: 'bg-pink-100 text-pink-700',
  reading: 'bg-teal-100 text-teal-700',
  resource: 'bg-indigo-100 text-indigo-700',
  life: 'bg-lime-100 text-lime-700',
}

export function generateStaticParams() {
  const params: Array<{ category: string; slug: string }> = []
  
  for (const post of allPosts) {
    const parts = post._raw.flattenedPath.split('/')
    if (parts.length >= 2) {
      params.push({
        category: parts[0],
        slug: parts[1],
      })
    }
  }
  
  console.log('Generating static params for posts:', params.length)
  return params
}

export default function PostPage({ params }: PostPageProps) {
  const { category, slug } = params
  const fullPath = `${category}/${slug}`
  
  const post = allPosts.find((p) => p._raw.flattenedPath === fullPath)

  if (!post) {
    console.log('Post not found:', fullPath)
    notFound()
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

      <article className="bg-white rounded-lg shadow-sm p-8">
        <header className="mb-8 border-b pb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[category] || 'bg-gray-100'}`}>
              {categoryNames[category] || category}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>📅 {format(new Date(post.date), 'yyyy-MM-dd')}</span>
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

        {post.summary && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-blue-900 font-medium">💡 {post.summary}</p>
          </div>
        )}

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

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />

        <footer className="mt-12 pt-6 border-t text-gray-400 text-sm">
          <p>📌 由墨白整理收录</p>
        </footer>
      </article>
    </main>
  )
}
