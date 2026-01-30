import { useEffect, useState, useMemo } from 'react'
import { getAlerts } from '../services/api'
import { Skeleton } from '../components/LoadingSkeleton'

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low']

const Alerts = () => {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await getAlerts({})
        setAlerts(res.data.data || [])
      } catch (err) {
        setError(err.message || 'Failed to load alerts')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatDate = (iso) => new Date(iso).toLocaleString()

  const severityColors = {
    low: 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200',
    medium: 'bg-yellow-200 dark:bg-yellow-800/50 text-yellow-800 dark:text-yellow-200',
    high: 'bg-orange-200 dark:bg-orange-800/50 text-orange-800 dark:text-orange-200',
    critical: 'bg-red-200 dark:bg-red-800/50 text-red-800 dark:text-red-200'
  }

  const groupedBySeverity = useMemo(() => {
    const groups = { critical: [], high: [], medium: [], low: [] }
    alerts.forEach((alert) => {
      const s = (alert.severity || 'low').toLowerCase()
      if (groups[s]) groups[s].push(alert)
      else groups.low.push(alert)
    })
    return SEVERITY_ORDER.map((key) => ({ severity: key, items: groups[key] })).filter(
      (g) => g.items.length > 0
    )
  }, [alerts])

  if (error && alerts.length === 0) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
        <p className="text-red-700 dark:text-red-300 font-medium">Error loading alerts</p>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alerts</h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {groupedBySeverity.map(({ severity, items }) => (
            <section key={severity} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
              <h2 className="px-4 py-3 sm:px-6 sm:py-4 text-lg font-semibold text-gray-900 dark:text-white capitalize flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-sm font-medium ${severityColors[severity] || 'bg-gray-200'}`}>
                  {severity}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({items.length})
                </span>
              </h2>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((alert) => (
                  <li key={alert.id} className="px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <p className="text-gray-900 dark:text-gray-100">{alert.message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${severityColors[alert.severity] || 'bg-gray-200 dark:bg-gray-600'}`}>
                        {alert.severity}
                      </span>
                      {formatDate(alert.timestamp)}
                      {alert.actionRequired && (
                        <span className="text-amber-600 dark:text-amber-400 text-xs font-medium">Action required</span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {!loading && alerts.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 p-8 text-center text-gray-500 dark:text-gray-400">
          No alerts at the moment
        </div>
      )}
    </div>
  )
}

export default Alerts
