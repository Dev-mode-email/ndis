import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/core/stores/authStore'
import { ROUTES } from '@/core/constants/routes'

interface DashboardGuardProps {
  children: React.ReactNode
}

export const DashboardGuard = ({ children }: DashboardGuardProps) => {
  const { user } = useAuthStore()
  const location = useLocation()

  if (!user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}

