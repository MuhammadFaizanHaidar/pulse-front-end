import { useEffect, useState } from 'react'
import { getPortfolio, getPortfolioPerformance } from '../services/api'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { Skeleton } from '../components/LoadingSkeleton'

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#e0e7ff']

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null)
  const [performance, setPerformance] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const [portfolioRes, perfRes] = await Promise.all([
          getPortfolio(),
          getPortfolioPerformance()
        ])
        setPortfolio(portfolioRes.data.data)
        setPerformance(perfRes.data.data)
      } catch (err) {
        setError(err.message || 'Failed to load portfolio')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value)
  const formatPercent = (value) =>
    `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`

  const isPositive = (n) => n >= 0
  const positiveClass = 'text-green-600 dark:text-green-400'
  const negativeClass = 'text-red-600 dark:text-red-400'

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>
      </div>
    )
  }

  if (error && !portfolio) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
        <p className="text-red-700 dark:text-red-300 font-medium">Error loading portfolio</p>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
      </div>
    )
  }

  const p = portfolio
  const perf = performance
  const allocationData = (perf?.assetAllocation || []).map((a, i) => ({
    name: a.assetId,
    value: a.percentage,
    fill: COLORS[i % COLORS.length]
  }))
  const valueData = (p?.assets || []).map((a) => ({
    name: a.assetId,
    value: a.value,
    change: a.changePercent
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>

      {/* Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <span>💼</span> Summary
        </h2>
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(p?.totalValue)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Change</p>
            <p className={`text-xl font-semibold ${isPositive(p?.totalChange) ? positiveClass : negativeClass}`}>
              {formatCurrency(p?.totalChange)} ({formatPercent(p?.totalChangePercent)})
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset allocation pie */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Asset Allocation</h2>
          {allocationData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name} ${value.toFixed(1)}%`}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No allocation data</p>
          )}
        </div>

        {/* Asset value bar chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Value by Asset</h2>
          {valueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={valueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: 'currentColor' }} stroke="currentColor" />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: 'currentColor' }} stroke="currentColor" />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} name="Value" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No asset data</p>
          )}
        </div>
      </div>

      {/* Holdings table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          Holdings
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {(p?.assets || []).map((asset) => (
                <tr key={asset.assetId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{asset.assetId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">{formatCurrency(asset.value)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${isPositive(asset.changePercent) ? positiveClass : negativeClass}`}>
                    {formatPercent(asset.changePercent)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!p?.assets || p.assets.length === 0) && (
          <p className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No holdings</p>
        )}
      </div>
    </div>
  )
}

export default Portfolio
