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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {Object.entries(categoryNames).map(([key, name]) => (
          <Link
            key={key}
            href={`/category/${key}`}
            className={`p-5 rounded-xl border-2 ${categoryColors[key]} hover:shadow-lg transition-all hover:-translate-y-1`}
          >
            <div className="flex items-center gap-3 mb-3">
              {categoryIcons[key]}
              <span className="font-semibold">{name}</span>
            </div>
            <div className="text-3xl font-bold">
              {stats.byCategory[key] || 0}
            </div>
            <div className="text-sm opacity-70">篇文章</div>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>最新内容</span>
          <span className="text-sm font-normal text-gray-400">({posts.length} 篇)</span>
        </h2>
        <div className="space-y-4">
          {posts.map((post) => {
            const postUrl = `/posts/${post._raw.flattenedPath}`
            return (
              <article
                key={post._id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border"
              >
                <Link href={postUrl} className="block">
                  <h3 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                
                {post.summary && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.summary}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className={`px-2 py-1 rounded ${categoryColors[post.category]}`}>
                    {categoryNames[post.category]}
                  </span>
                  <span className="text-gray-400">{format(new Date(post.date), 'yyyy-MM-dd')}</span>
                  <span className="text-gray-500">{post.author}</span>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
