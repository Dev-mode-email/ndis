import { Logo } from '@/core/components/common/Logo'

interface AuthHeaderProps {
  className?: string
}

export const AuthHeader = ({ className = '' }: AuthHeaderProps) => {
  return (
    <div className={`mb-12 ${className}`}>
      <Logo className="h-12" clickable={false} />
    </div>
  )
}

