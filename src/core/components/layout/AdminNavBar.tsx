import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Logo } from '@/core/components/common/Logo'
import { ROUTES } from '@/core/constants/routes'
import { cn } from '@/core/lib/utils'
import { Settings, LogOut } from 'lucide-react'
import { HomeIcon } from '@/core/components/icons/sidebar/HomeIcon'
import { UsersIcon } from '@/core/components/icons/sidebar/UsersIcon'
import { WalletsIcon } from '@/core/components/icons/sidebar/WalletsIcon'
import { TransactionsIcon } from '@/core/components/icons/sidebar/TransactionsIcon'
import { PaymentIcon } from '@/core/components/icons/sidebar/PaymentIcon'
import { MoodIcon } from '@/core/components/icons/sidebar/MoodIcon'
import { Popover, PopoverTrigger, PopoverContent } from '@/core/components/ui/popover'
import { useAuthStore } from '@/core/stores/authStore'
import { Button } from '@/core/components/ui/button'

const navItems = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD.HOME,
    Icon: HomeIcon,
  },
  {
    label: 'Users',
    path: ROUTES.USERS.INDEX,
    Icon: UsersIcon,
  },
  {
    label: 'Wallets',
    path: ROUTES.WALLETS.INDEX,
    Icon: WalletsIcon,
  },
  {
    label: 'Transactions',
    path: ROUTES.TRANSACTIONS.INDEX,
    Icon: TransactionsIcon,
  },
  {
    label: 'New Payment',
    path: ROUTES.PAYMENTS.NEW,
    Icon: PaymentIcon,
  },
  {
    label: 'Mood Reports',
    path: ROUTES.MOOD_REPORTS.INDEX,
    Icon: MoodIcon,
  },
]

export const AdminNavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, clearUser } = useAuthStore()

  const isActive = (path: string) => {
    if (path === ROUTES.DASHBOARD.HOME) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    clearUser()
    navigate(ROUTES.AUTH.LOGIN)
  }

  return (
    <nav
      className="hidden md:flex flex-col w-[260px] min-h-screen bg-[#FFFFFF] border-r border-border fixed top-0 left-0 z-40"
      dir="ltr"
    >
      {/* Logo */}
      <div className="pt-6 pb-8 pl-5 pr-6 flex items-center">
        <Logo className="h-12 w-auto" />
      </div>
      {/* Top divider line with horizontal insets */}
      <div className="mx-5 mb-4 h-px bg-border" />

      {/* Navigation items */}
      <div className="flex flex-col gap-1 py-6 px-3 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path)
          const Icon = item.Icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-[#D2EFFF] text-[#00649E]'
                  : 'text-[#475467] hover:bg-[#F2F4F7] hover:text-[#00649E]'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5',
                  active ? 'text-[#00649E]' : 'text-[#667085]'
                )}
              />
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Account at bottom */}
      <div className="px-3 pb-6 pt-4">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive(ROUTES.ACCOUNT.INDEX)
                  ? 'bg-[#D2EFFF] text-[#00649E]'
                  : 'text-[#475467] hover:bg-[#F2F4F7] hover:text-[#00649E]'
              )}
            >
              <Settings
                className={cn(
                  'w-5 h-5',
                  isActive(ROUTES.ACCOUNT.INDEX) ? 'text-[#00649E]' : 'text-[#667085]'
                )}
              />
              Account
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="end" side="top">
            <div className="p-4">
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">Signed in as</p>
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.email || 'User'}
                </p>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  )
}
