import { LoginForm } from '../components/forms/LoginForm'
import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { AuthHeader } from '../components/layout/AuthHeader'
import { Card } from '@/core/components/common/Card'

export const LoginPage = () => {
  useDocumentTitle('Sign In')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header with Logo */}
      <div className="px-6 py-8">
        <AuthHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-8">
        <div className="w-full max-w-md">
          {/* Login Form Card */}
          <Card className="p-6 md:p-8">
            {/* Header inside card */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            <LoginForm />
          </Card>
        </div>
      </div>
    </div>
  )
}

