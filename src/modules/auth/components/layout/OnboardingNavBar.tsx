import { Logo } from '@/core/components/common/Logo'
import { cn } from '@/core/lib/utils'

interface OnboardingNavBarProps {
  className?: string
  hasSidebar?: boolean
}

export const OnboardingNavBar = ({ className = '', hasSidebar = false }: OnboardingNavBarProps) => {
  return (
    <nav
      className={cn(
        'fixed top-0 right-0 z-50 flex items-center justify-between px-16 py-4 bg-white border-b border-gray-200',
        hasSidebar ? 'left-[260px]' : 'left-0',
        className
      )}
    >
      <Logo className="h-8" clickable={false} />
    </nav>
  )
}

