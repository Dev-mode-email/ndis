import { Button } from '@/core/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { UserType } from './UserTypeSelection'
import { GeneralCompanyInfoFormValues } from '../forms/GeneralCompanyInfoForm'

interface OnboardingCompleteProps {
  formData: {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    username: string
  } | null
  userType: UserType | null
  companyInfo: GeneralCompanyInfoFormValues | null
  onComplete: () => void
}

export const OnboardingComplete = ({ 
  formData, 
  userType, 
  companyInfo, 
  onComplete 
}: OnboardingCompleteProps) => {
  const getUserTypeLabel = () => {
    switch (userType) {
      case 'individual': return 'Individual Participant'
      case 'provider': return 'Service Provider'
      case 'multiple': return 'Multiple Participants'
      case 'government': return 'Government Organisation'
      default: return 'N/A'
    }
  }

  return (
    <div className="w-full max-w-[700px]">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Onboarding is Complete!
          </h1>
          <p className="text-gray-600">
            You have successfully completed all onboarding steps
          </p>
        </div>

        {/* User Info */}
        {formData && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">User Info</h3>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-gray-900">
                  {formData.firstName} {formData.lastName}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{formData.phoneNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Username</p>
                <p className="font-medium text-gray-900">{formData.username}</p>
              </div>
            </div>
          </div>
        )}

        {/* Participant Type */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Participant Type</h3>
          <p className="font-medium text-gray-900">{getUserTypeLabel()}</p>
        </div>

        {/* General Company Info */}
        {companyInfo && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">General Company Info</h3>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Company</p>
                <p className="font-medium text-gray-900">{companyInfo.companyName}</p>
              </div>
              <div>
                <p className="text-gray-500">ABN</p>
                <p className="font-medium text-gray-900">{companyInfo.abn}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{companyInfo.phoneNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium text-gray-900 capitalize">{companyInfo.type}</p>
              </div>
            </div>
          </div>
        )}

        {/* Address */}
        {companyInfo && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Address</h3>
            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Line 1</p>
                <p className="font-medium text-gray-900">{companyInfo.addressLine1}</p>
              </div>
              <div>
                <p className="text-gray-500">Line 2</p>
                <p className="font-medium text-gray-900">{companyInfo.addressLine2 || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">City</p>
                <p className="font-medium text-gray-900 capitalize">{companyInfo.city}</p>
              </div>
              <div>
                <p className="text-gray-500">Postcode</p>
                <p className="font-medium text-gray-900">{companyInfo.postcode}</p>
              </div>
              <div>
                <p className="text-gray-500">Country</p>
                <p className="font-medium text-gray-900">{companyInfo.country}</p>
              </div>
            </div>
          </div>
        )}

        {/* Complete Button */}
        <Button onClick={onComplete} className="w-full h-12">
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

