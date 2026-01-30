import { useEffect, useState, useCallback } from 'react'
import { getDashboard, getPortfolio } from '../services/api'
import { DashboardSkeleton } from '../components/LoadingSkeleton'

const POLL_INTERVAL_MS = 30_000

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const [portfolioRes, dashboardRes] = await Promise.all([
        getPortfolio(),
        getDashboard()
      ])
      setPortfolio(portfolioRes.data.data)
      setDashboard(dashboardRes.data.data)
    } catch (err) {
      setError(err.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!fetchData) return
    const id = setInterval(fetchData, POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [fetchData])

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value)
  const formatPercent = (value) =>
    `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  const formatDate = (iso) => new Date(iso).toLocaleString()

  const isPositive = (n) => n >= 0
  const positiveClass = 'text-green-600 dark:text-green-400'
  const negativeClass = 'text-red-600 dark:text-red-400'

  if (loading && !portfolio) return <DashboardSkeleton />

  if (error && !portfolio) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
        <p className="text-red-700 dark:text-red-300 font-medium">Unable to load dashboard</p>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
        <button
          type="button"
          onClick={() => { setLoading(true); fetchData(); }}
          className="mt-4 px-4 py-2 bg-pulse-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    )
  }

  const p = portfolio
  const topGainers = (dashboard?.topGainers || []).slice(0, 3)
  const topLosers = (dashboard?.topLosers || []).slice(0, 3)
  const recentNews = (dashboard?.recentNews || []).slice(0, 5)
  const activeAlerts = (dashboard?.activeAlerts || []).slice(0, 5)

  const severityColors = {
    low: 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200',
    medium: 'bg-yellow-200 dark:bg-yellow-800/50 text-yellow-800 dark:text-yellow-200',
    high: 'bg-orange-200 dark:bg-orange-800/50 text-orange-800 dark:text-orange-200',
    critical: 'bg-red-200 dark:bg-red-800/50 text-red-800 dark:text-red-200'
  }

  const cardClass = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 transition-colors duration-200'

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      {/* Portfolio Summary Card */}
      {p && (
        <div className={`${cardClass} mb-6`}>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <span>💼</span> Portfolio Summary
          </h2>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(p.totalValue)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Change</p>
              <p className={`text-xl font-semibold ${isPositive(p.totalChange) ? positiveClass : negativeClass}`}>
                {formatCurrency(p.totalChange)} ({formatPercent(p.totalChangePercent)})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <span>📈</span> Top Gainers
          </h2>
          <ul className="space-y-3">
            {topGainers.map((asset) => (
              <li key={asset.symbol || asset.id} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{asset.symbol}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">{asset.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(asset.currentPrice)}</p>
                  <p className={positiveClass}>{formatPercent(asset.changePercent)}</p>
                </div>
              </li>
            ))}
            {topGainers.length === 0 && <p className="text-gray-500 dark:text-gray-400">No gainers</p>}
          </ul>
        </div>
        <div className={cardClass}>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <span>📉</span> Top Losers
          </h2>
          <ul className="space-y-3">
            {topLosers.map((asset) => (
              <li key={asset.symbol || asset.id} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{asset.symbol}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">{asset.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(asset.currentPrice)}</p>
                  <p className={negativeClass}>{formatPercent(asset.changePercent)}</p>
                </div>
              </li>
            ))}
            {topLosers.length === 0 && <p className="text-gray-500 dark:text-gray-400">No losers</p>}
          </ul>
        </div>
      </div>

      {/* Recent News Feed */}
      <div className={cardClass}>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <span>📰</span> Recent News
        </h2>
        <ul className="space-y-4">
          {recentNews.map((item) => (
            <li key={item.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
              <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {item.source} · <span className="capitalize">{item.category}</span> · {formatDate(item.timestamp)}
              </p>
            </li>
          ))}
          {recentNews.length === 0 && <p className="text-gray-500 dark:text-gray-400">No recent news</p>}
        </ul>
      </div>

      {/* Active Alerts Summary */}
      <div className={cardClass}>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <span>🔔</span> Active Alerts
        </h2>
        <ul className="space-y-4">
          {activeAlerts.map((alert) => (
            <li key={alert.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
              <p className="text-gray-900 dark:text-gray-100">{alert.message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${severityColors[alert.severity] || 'bg-gray-200 dark:bg-gray-600'}`}>
                  {alert.severity}
                </span>
                {formatDate(alert.timestamp)}
              </p>
            </li>
          ))}
          {activeAlerts.length === 0 && <p className="text-gray-500 dark:text-gray-400">No active alerts</p>}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
