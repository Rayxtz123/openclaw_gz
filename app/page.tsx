import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import { 
  Wallet, Plane, Bot, Briefcase, Brain, BookOpen, Package, Leaf 
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
  finance: 'bg-finance/10 text-finance border-finance/20',
  travel: 'bg-travel/10 text-travel border-travel/20',
  ai: 'bg-ai/10 text-ai border-ai/20',
  work: 'bg-work/10 text-work border-work/20',
  thinking: 'bg-thinking/10 text-thinking border-thinking/20',
  reading: 'bg-reading/10 text-reading border-reading/20',
  resource: 'bg-resource/10 text-resource border-resource/20',
  life: 'bg-life/10 text-life border-life/20',
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
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">OpenClaw 内容库</h1>
        <p className="text-gray-600">由 AI 助手「墨白」自动整理</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {Object.entries(categoryNames).map(([key, name]) => (
          <Link
            key={key}
            href={`/category/${key}`}
            className={`p-4 rounded-lg border ${categoryColors[key]} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center gap-2 mb-2">
              {categoryIcons[key]}
              <span className="font-medium">{name}</span>
            </div>
            <div className="text-2xl font-bold">
              {stats.byCategory[key] || 0}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">最新内容</h2>
        <div className="space-y-4">
          {posts.slice(0, 10).map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Link href={post.url}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded ${categoryColors[post.category]}`}>
                      {categoryNames[post.category]}
                    </span>
                    <span>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
