import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format, compareDesc } from 'date-fns'

interface CategoryPageProps {
  params: { id: string }
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
  finance: 'bg-finance/10 text-finance border-finance/20',
  travel: 'bg-travel/10 text-travel border-travel/20',
  ai: 'bg-ai/10 text-ai border-ai/20',
  work: 'bg-work/10 text-work border-work/20',
  thinking: 'bg-thinking/10 text-thinking border-thinking/20',
  reading: 'bg-reading/10 text-reading border-reading/20',
  resource: 'bg-resource/10 text-resource border-resource/20',
  life: 'bg-life/10 text-life border-life/20',
}

export function generateStaticParams() {
  return Object.keys(categoryNames).map((id) => ({ id }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.id
  
  if (!categoryNames[category]) {
    notFound()
  }

  const posts = allPosts
    .filter((post) => post.category === category)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-900">
          ← 返回首页
        </Link>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${categoryColors[category]} mt-4`}>
          <span className="text-2xl">{category === 'finance' && '💰' ||
            category === 'travel' && '✈️' ||
            category === 'ai' && '🤖' ||
            category === 'work' && '💼' ||
            category === 'thinking' && '🧠' ||
            category === 'reading' && '📚' ||
            category === 'resource' && '📦' ||
            '🌱'}</span>
          <h1 className="text-2xl font-bold">{categoryNames[category]}</h1>
          <span className="text-sm opacity-70">({posts.length} 篇)</span>
        </div>
      </header>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={post.url}>
              <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
                {post.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-3">{post.summary}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
              <span>{post.author}</span>
              {post.tags && (
                <div className="flex gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
