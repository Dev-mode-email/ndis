import { useNavigate } from 'react-router-dom'
import { RegisterForm, type RegisterFormValues } from '../components/forms/RegisterForm'
import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { Card } from '@/core/components/common/Card'
import { useAuthStore } from '@/core/stores/authStore'
import { useRegister } from '@/core/hooks/auth/useAuth'
import { ROUTES } from '@/core/constants/routes'
import { axiosInstance } from '@/core/api/axios'

export const RegisterPage = () => {
  useDocumentTitle('Create Account')
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const registerMutation = useRegister()

  const handleRegister = async (data: RegisterFormValues) => {
    try {
      const response = await registerMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phoneNumber,
        password: data.password,
      })

      const { access_token, refresh_token, email, userId } = response.data

      setUser({
        email,
        userId,
        access_token,
        refresh_token,
      })

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

      navigate(ROUTES.ONBOARDING.INDEX)
    } catch (error: any) {
      console.error('Registration error:', error)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="flex items-center justify-center flex-1 px-16 py-8">
          <div className="w-full max-w-[600px]">
            <Card className="px-6 py-8">
              <div className="mb-4">
                <h1 className="font-gotham text-2xl font-bold text-gray-900 leading-[38px] mb-4">
                  Create your admin account
                </h1>
                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-base leading-6 text-gray-900">For participants:</span>{' '}
                    <span className="text-sm font-medium leading-6 text-gray-500">usually a parent or financial guardian</span>
                  </div>
                  <div>
                    <span className="font-bold text-base leading-6 text-gray-900">For providers:</span>{' '}
                    <span className="text-sm font-medium leading-6 text-gray-500">usually a finance, service delivery or executive team member</span>
                  </div>
                </div>
              </div>
              <div className="h-[4px] bg-gray-50 mb-4"></div>
              <RegisterForm onNext={handleRegister} />
            </Card>
          </div>
        </div>
      </div>

      {/* Right Column - Promotional Image */}
      <div 
        className="hidden lg:flex flex-1 relative bg-cover bg-center justify-center items-center"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL || '/'}image.png)` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center text-white px-12">
          <h2 className="text-[40px] leading-[44px] font-bold mb-6 text-center">
            Confident Money Management
          </h2>
          <p className="text-[24px] leading-[32px] font-medium text-center text-white max-w-md mb-8">
            Safe & Supported Money Management for children and adults with disability helping handle money confidently and securely
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-5">
              <div className="w-10 h-10 rounded-full bg-red-400 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-green-400 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-white"></div>
            </div>
            <span className="text-[16px] leading-[21px] font-medium text-white">
              Join 1,000's of other people!
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
