import { useEffect, useState, useMemo } from 'react'
import { getStocks, getCrypto } from '../services/api'
import { TableSkeleton } from '../components/LoadingSkeleton'

const FILTER_ALL = 'all'
const FILTER_STOCKS = 'stocks'
const FILTER_CRYPTO = 'crypto'

const SORT_KEYS = {
  price: 'currentPrice',
  changePercent: 'changePercent',
  volume: 'volume'
}

const Assets = () => {
  const [stocks, setStocks] = useState([])
  const [crypto, setCrypto] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState(FILTER_ALL)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('symbol')
  const [sortOrder, setSortOrder] = useState('asc')
  const [selectedAsset, setSelectedAsset] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const [stocksRes, cryptoRes] = await Promise.all([
          getStocks(),
          getCrypto()
        ])
        setStocks(Array.isArray(stocksRes.data) ? stocksRes.data : [])
        setCrypto(Array.isArray(cryptoRes.data) ? cryptoRes.data : [])
      } catch (err) {
        setError(err.message || 'Failed to load assets')
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
  const formatVolume = (n) =>
    n >= 1e9 ? `${(n / 1e9).toFixed(2)}B` : n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(2)}K` : String(n)

  const stocksWithType = useMemo(() => stocks.map((s) => ({ ...s, assetType: 'stock' })), [stocks])
  const cryptoWithType = useMemo(() => crypto.map((c) => ({ ...c, assetType: 'crypto' })), [crypto])
  const allAssets = useMemo(() => [...stocksWithType, ...cryptoWithType], [stocksWithType, cryptoWithType])

  const filteredByType =
    filter === FILTER_STOCKS
      ? stocksWithType
      : filter === FILTER_CRYPTO
        ? cryptoWithType
        : allAssets

  const searchLower = search.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!searchLower) return filteredByType
    return filteredByType.filter(
      (a) =>
        (a.symbol && a.symbol.toLowerCase().includes(searchLower)) ||
        (a.name && a.name.toLowerCase().includes(searchLower))
    )
  }, [filteredByType, searchLower])

  const sorted = useMemo(() => {
    const key = SORT_KEYS[sortKey] || sortKey
    return [...filtered].sort((a, b) => {
      const va = a[key]
      const vb = b[key]
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortOrder === 'asc' ? va - vb : vb - va
      }
      const sa = String(va ?? '').toLowerCase()
      const sb = String(vb ?? '').toLowerCase()
      return sortOrder === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa)
    })
  }, [filtered, sortKey, sortOrder])

  const toggleSort = (key) => {
    if (sortKey === key) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const isPositive = (n) => n >= 0
  const positiveClass = 'text-green-600 dark:text-green-400'
  const negativeClass = 'text-red-600 dark:text-red-400'

  if (loading) return <TableSkeleton rows={8} />
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
        <p className="text-red-700 dark:text-red-300 font-medium">Error loading assets</p>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
      </div>
    )
  }

  const Th = ({ sortKey: key, children, className = '' }) => (
    <th className={className}>
      {key in SORT_KEYS ? (
        <button
          type="button"
          onClick={() => toggleSort(key)}
          className="text-left w-full flex items-center justify-end gap-1 hover:text-pulse-primary transition-colors"
        >
          {children}
          <span className="text-xs">
            {sortKey === key ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
          </span>
        </button>
      ) : (
        children
      )}
    </th>
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assets</h1>

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</span>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            {[
              [FILTER_ALL, 'All'],
              [FILTER_STOCKS, 'Stocks'],
              [FILTER_CRYPTO, 'Crypto']
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`px-4 py-2 text-sm font-medium border-r border-gray-200 dark:border-gray-600 last:border-r-0 ${
                  filter === value
                    ? 'bg-pulse-primary text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <input
          type="search"
          placeholder="Search by symbol or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 sm:max-w-xs px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pulse-primary focus:border-transparent"
        />
      </div>

      {/* Table - responsive: card on small screens */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Name
                </th>
                <Th sortKey="price" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </Th>
                <Th sortKey="changePercent" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Change %
                </Th>
                <Th sortKey="volume" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Volume
                </Th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sm:hidden">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sorted.map((asset) => (
                <tr
                  key={`${asset.assetType}-${asset.symbol}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {asset.symbol}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                    {asset.name}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                    {formatCurrency(asset.currentPrice)}
                  </td>
                  <td className={`px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${isPositive(asset.changePercent) ? positiveClass : negativeClass}`}>
                    {formatPercent(asset.changePercent)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600 dark:text-gray-400 hidden md:table-cell">
                    {formatVolume(asset.volume)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right sm:hidden">
                    <span className="text-pulse-primary text-sm font-medium">View</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sorted.length === 0 && (
          <p className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No assets to display</p>
        )}
      </div>

      {/* Asset detail modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70"
          onClick={() => setSelectedAsset(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="asset-modal-title"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="asset-modal-title" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedAsset.symbol} – {selectedAsset.name}
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Type</dt>
                <dd className="font-medium text-gray-900 dark:text-white capitalize">{selectedAsset.assetType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Price</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedAsset.currentPrice)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Change</dt>
                <dd className={isPositive(selectedAsset.changePercent) ? positiveClass : negativeClass}>
                  {formatPercent(selectedAsset.changePercent)}
                </dd>
              </div>
              {selectedAsset.volume != null && (
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Volume</dt>
                  <dd className="text-gray-900 dark:text-white">{formatVolume(selectedAsset.volume)}</dd>
                </div>
              )}
              {selectedAsset.sector && (
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Sector</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedAsset.sector}</dd>
                </div>
              )}
              {selectedAsset.marketCap != null && (
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Market Cap</dt>
                  <dd className="text-gray-900 dark:text-white">{formatVolume(selectedAsset.marketCap)}</dd>
                </div>
              )}
            </dl>
            <button
              type="button"
              onClick={() => setSelectedAsset(null)}
              className="mt-6 w-full py-2 rounded-lg bg-pulse-primary text-white font-medium hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Assets
