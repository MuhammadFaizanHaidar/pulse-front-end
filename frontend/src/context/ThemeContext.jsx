import { createContext, useContext, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext(null)

function getInitialDark() {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem('pulse-theme')
  if (stored === 'dark' || stored === 'light') return stored === 'dark'
  return document.documentElement.classList.contains('dark')
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getInitialDark)

  useLayoutEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      localStorage.setItem('pulse-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
      localStorage.setItem('pulse-theme', 'light')
    }
  }, [dark])

  const toggleTheme = () => {
    setDark((d) => !d)
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
