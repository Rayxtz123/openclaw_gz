import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format, compareDesc } from 'date-fns'

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
  finance: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  travel: 'bg-blue-100 text-blue-700 border-blue-200',
  ai: 'bg-purple-100 text-purple-700 border-purple-200',
  work: 'bg-amber-100 text-amber-700 border-amber-200',
  thinking: 'bg-pink-100 text-pink-700 border-pink-200',
  reading: 'bg-teal-100 text-teal-700 border-teal-200',
  resource: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  life: 'bg-lime-100 text-lime-700 border-lime-200',
}

const categoryIcons: Record<string, string> = {
  finance: '💰',
  travel: '✈️',
  ai: '🤖',
  work: '💼',
  thinking: '🧠',
  reading: '📚',
  resource: '📦',
  life: '🌱',
}

export function generateStaticParams() {
  return Object.keys(categoryNames).map((id) => ({ id }))
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = params.id
  
  if (!categoryNames[category]) {
    notFound()
  }

  const posts = allPosts
    .filter((post) => post.category === category)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const icon = categoryIcons[category]
  const colorClass = categoryColors[category]

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4"
        >
          ← 返回首页
        </Link>
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 ${colorClass}`}>
          <span className="text-3xl">{icon}</span>
          <h1 className="text-2xl font-bold">{categoryNames[category]}</h1>
          <span className="text-sm opacity-70 bg-white/50 px-2 py-1 rounded">
            {posts.length} 篇
          </span>
        </div>
      </header>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            该分类下暂无文章
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border"
            >
              <Link href={`/posts/${post._raw.flattenedPath}`}>
                <h3 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
              </Link>
              
              {post.summary && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.summary}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>📅 {format(new Date(post.date), 'yyyy-MM-dd')}</span>
                {post.author && <span>👤 {post.author}</span>}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  )
}
