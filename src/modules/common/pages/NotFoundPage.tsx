import { Link } from 'react-router-dom'
import { Button } from '@/core/components/ui/button'
import { ROUTES } from '@/core/constants/routes'

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-muted-foreground mb-6">Page not found</p>
                <Link to={ROUTES.HOME}>
                    <Button>Go Home</Button>
                </Link>
            </div>
        </div>
    )
}

