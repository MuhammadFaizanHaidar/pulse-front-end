import { useEffect, useState } from 'react'
import { getNews } from '../services/api'
import { Skeleton } from '../components/LoadingSkeleton'

const CATEGORIES = [
  { value: '', label: 'All categories' },
  { value: 'macro', label: 'Macro' },
  { value: 'technology', label: 'Technology' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'earnings', label: 'Earnings' },
  { value: 'regulatory', label: 'Regulatory' },
  { value: 'market', label: 'Market' }
]

const News = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const params = category ? { category } : {}
        const res = await getNews(params)
        setNews(res.data.data || [])
      } catch (err) {
        setError(err.message || 'Failed to load news')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [category])

  const formatDate = (iso) => new Date(iso).toLocaleString()

  const impactColors = {
    low: 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200',
    medium: 'bg-blue-200 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200',
    high: 'bg-orange-200 dark:bg-orange-800/50 text-orange-800 dark:text-orange-200',
    critical: 'bg-red-200 dark:bg-red-800/50 text-red-800 dark:text-red-200'
  }

  if (error && news.length === 0) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
        <p className="text-red-700 dark:text-red-300 font-medium">Error loading news</p>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">News</h1>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <label htmlFor="news-category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          id="news-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-pulse-primary focus:border-transparent sm:max-w-xs"
        >
          {CATEGORIES.map((opt) => (
            <option key={opt.value || 'all'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {news.map((item) => (
              <li key={item.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.source} · {formatDate(item.timestamp)}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${impactColors[item.impact] || 'bg-gray-200 dark:bg-gray-600'}`}>
                    {item.impact}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-pulse-primary dark:text-indigo-200">
                    {item.category}
                  </span>
                </div>
                {item.summary && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{item.summary}</p>
                )}
              </li>
            ))}
          </ul>
        )}
        {!loading && news.length === 0 && (
          <p className="p-8 text-center text-gray-500 dark:text-gray-400">No news in this category</p>
        )}
      </div>
    </div>
  )
}

export default News
