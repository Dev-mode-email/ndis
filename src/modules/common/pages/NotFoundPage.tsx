import { useNavigate } from 'react-router-dom'
import { Button } from '@/core/components/ui/button'
import { ROUTES } from '@/core/constants/routes'

export const NotFoundPage = () => {
    const navigate = useNavigate()
    
    const handleGoHome = () => {
        // Get base path from environment or current location
        const basePath = import.meta.env.BASE_URL || '/'
        const loginPath = basePath === '/' 
            ? ROUTES.AUTH.LOGIN 
            : basePath + ROUTES.AUTH.LOGIN.slice(1) // Remove leading slash and add base path
        
        // Use window.location to ensure correct path with base
        window.location.href = loginPath
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-muted-foreground mb-6">Page not found</p>
                <Button onClick={handleGoHome}>Go Home</Button>
            </div>
        </div>
    )
}

