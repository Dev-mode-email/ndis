import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/core/stores/authStore'
import { ROUTES } from "@/core/constants/routes.ts"
import { SessionExpiredModal } from '@/core/components/ui/modals/SessionExpiredModal'

interface ProtectedRouteProps {
    children?: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, sessionExpired } = useAuthStore()
    const location = useLocation()

    if (sessionExpired) {
        return (
            <>
                {children || <Outlet />}
                <SessionExpiredModal />
            </>
        )
    }

    if (!user) {
        return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
    }

    return children ? <>{children}</> : <Outlet />
}
