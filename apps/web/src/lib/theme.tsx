import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

const THEME_KEY = 'wakulaw_theme'

interface ThemeContextValue {
  dark: boolean
  toggleDark: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState<boolean>(() => {
    return localStorage.getItem(THEME_KEY) !== 'light'
  })

  useEffect(() => {
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    // `wk-light` flips the shadcn token set defined in styles/theme.css.
    document.documentElement.classList.toggle('wk-light', !dark)
  }, [dark])

  return (
    <ThemeContext.Provider
      value={{ dark, toggleDark: () => setDark((d) => !d) }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components -- context + hook intentionally live together
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
