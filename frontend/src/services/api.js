import axios from 'axios'

// Use VITE_API_URL when running frontend standalone (e.g. pulse-front-end repo); run backend on that URL
const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getStocks = () => api.get('/stocks')
export const getStock = (symbol) => api.get(`/stocks/${symbol}`)
export const getCrypto = () => api.get('/crypto')
export const getCryptoBySymbol = (symbol) => api.get(`/crypto/${symbol}`)
export const getNews = (params) => api.get('/news', { params })
export const getNewsByAsset = (symbol) => api.get(`/news/asset/${symbol}`)
export const getAlerts = (params) => api.get('/alerts', { params })
export const getEvents = () => api.get('/events')
export const getUpcomingEvents = () => api.get('/events/upcoming')
export const getInfluencers = () => api.get('/influencers')
export const getPortfolio = () => api.get('/portfolio')
export const getPortfolioPerformance = () => api.get('/portfolio/performance')
export const getInsights = (params) => api.get('/insights', { params })
export const getDashboard = () => api.get('/dashboard')

export default api
