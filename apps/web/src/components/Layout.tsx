import { NavLink, Outlet, Link } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: '▦' },
  { to: '/upload', label: 'Upload', icon: '⇪' },
  { to: '/documents', label: 'Documents', icon: '☰' },
  { to: '/ask', label: 'Ask AI', icon: '✦' },
  { to: '/similar', label: 'Similar Cases', icon: '≈' },
]

function navLinkClass({ isActive }: { isActive: boolean }): string {
  const base =
    'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors'
  return isActive
    ? `${base} bg-gold/10 text-gold`
    : `${base} text-neutral-400 hover:bg-ink-850 hover:text-neutral-100`
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-2" title="WakuLaw home">
      <span aria-hidden="true" className="text-xl leading-none text-gold">
        ⚖
      </span>
      <span className="text-lg font-semibold tracking-tight text-neutral-100">
        Waku<span className="text-gold">Law</span>
      </span>
    </Link>
  )
}

/**
 * App shell: persistent sidebar on desktop, compact top bar with the same
 * nav on small screens. Rendered around every page except the landing page.
 */
export default function Layout() {
  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-64 shrink-0 border-r border-line bg-ink-900 md:sticky md:top-0 md:flex md:h-screen md:flex-col">
        <div className="px-4 pt-6 pb-4">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 px-4" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              <span aria-hidden="true" className="w-4 text-center">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="border-t border-line px-6 py-4 text-xs leading-relaxed text-neutral-500">
          Decision-support only — not legal advice.
        </p>
      </aside>

      {/* Top bar (mobile) */}
      <header className="sticky top-0 z-10 border-b border-line bg-ink-900/95 backdrop-blur md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo />
        </div>
        <nav
          className="flex gap-1 overflow-x-auto px-3 pb-2"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
