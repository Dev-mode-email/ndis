import { Button } from '@/core/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { UserType } from './UserTypeSelection'
import { GeneralCompanyInfoFormValues } from '../forms/GeneralCompanyInfoForm'
import { FilterEditIcon } from '@/core/components/icons'

interface GeneralCompanyInfoSuccessProps {
  formData: {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    username: string
  } | null
  userType: UserType | null
  companyInfo: GeneralCompanyInfoFormValues | null
  onNext: () => void
  onEdit?: (section: 'user' | 'participant' | 'company') => void
}

export const GeneralCompanyInfoSuccess = ({
  formData,
  userType,
  companyInfo,
  onNext,
  onEdit,
}: GeneralCompanyInfoSuccessProps) => {
  const getUserTypeLabel = () => {
    switch (userType) {
      case 'individual': return 'Individual Participant'
      case 'provider': return 'Service Provider'
      case 'multiple': return 'Multiple Participants'
      case 'government': return 'Government Organisation'
      default: return 'N/A'
    }
  }

  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      corporate: 'Corporate',
      'corporate-partnership': 'Corporate Partnership',
      partnership: 'Partnership',
      'sole-trader': 'Sole Trader',
      trust: 'Trust',
      'non-profit': 'Non-Profit',
    }
    return typeMap[type] || type
  }

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-[1040px] bg-white rounded-2xl border border-gray-100 shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#ECFDF3] rounded-full flex items-center justify-center p-2">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M19.9997 31.9999L27.9997 39.9999L43.9997 23.9999M58.6663 31.9999C58.6663 46.7274 46.7271 58.6666 31.9997 58.6666C17.2721 58.6666 5.33301 46.7274 5.33301 31.9999C5.33301 17.2723 17.2721 5.33325 31.9997 5.33325C46.7271 5.33325 58.6663 17.2723 58.6663 31.9999Z"
              stroke="#05603A"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Success Banner */}
        <div className="bg-[#ECFDF3] rounded-t-2xl px-5 pt-8 pb-6 flex flex-col items-center gap-2">
          <h2 className="font-montserrat text-2xl font-bold text-[#05603A] leading-[1.33] text-center">
            You've created your Account!
          </h2>
          <p className="font-montserrat text-sm font-medium text-[#027A48] leading-[1.43] text-center">
            The next step is to select a subscription that works best for your account!
          </p>
        </div>

        {/* Content */}
        <div className="px-5 py-6 space-y-8">

          {/* User Info Section */}
          {formData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-gotham text-base font-normal text-[#101828] leading-[1.5] flex-1">
                  User Info
                </h3>
                {onEdit && (
                  <button
                    onClick={() => onEdit('user')}
                    className="text-[#007DC6] hover:text-[#00649E] transition-colors shrink-0"
                    aria-label="Edit user info"
                  >
                    <FilterEditIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
              <div className="bg-[#F9FAFB] rounded-md px-4 py-[10px] flex gap-6">
                <div className="flex flex-col gap-1 flex-1">
                  <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                    Full Name
                  </p>
                  <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                    {formData.firstName} {formData.lastName}
                  </p>
                </div>
                <div className="w-px bg-[#E9E9E9]" />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                    Phone Number
                  </p>
                  <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                    {formData.phoneNumber}
                  </p>
                </div>
                <div className="w-px bg-[#E9E9E9]" />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                    User Email
                  </p>
                  <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                    {formData.email}
                  </p>
                </div>
                <div className="w-px bg-[#E9E9E9]" />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                    Username
                  </p>
                  <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                    {formData.username}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Participant Type Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-gotham text-base font-normal text-[#101828] leading-[1.5] flex-1">
                Participant Type
              </h3>
              {onEdit && (
                <button
                  onClick={() => onEdit('participant')}
                  className="text-[#007DC6] hover:text-[#00649E] transition-colors shrink-0"
                  aria-label="Edit participant type"
                >
                  <FilterEditIcon className="h-6 w-6" />
                </button>
              )}
            </div>
            <div className="bg-[#F9FAFB] rounded-md px-4 py-[10px] flex gap-[10px]">
              <div className="flex flex-col gap-1">
                <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                  Setup For
                </p>
                <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                  {getUserTypeLabel()}
                </p>
              </div>
            </div>
          </div>

          {/* General Company Info Section */}
          {companyInfo && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-gotham text-base font-normal text-[#101828] leading-[1.5] flex-1">
                  General Company Info
                </h3>
                {onEdit && (
                  <button
                    onClick={() => onEdit('company')}
                    className="text-[#007DC6] hover:text-[#00649E] transition-colors shrink-0"
                    aria-label="Edit company info"
                  >
                    <FilterEditIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {/* Company Info Block */}
                <div className="bg-[#F9FAFB] rounded-md px-4 py-[10px] flex gap-6">
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                      Company Name
                    </p>
                    <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                      {companyInfo.companyName}
                    </p>
                  </div>
                  <div className="w-px bg-[#E9E9E9]" />
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                      ABN
                    </p>
                    <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                      {companyInfo.abn}
                    </p>
                  </div>
                  <div className="w-px bg-[#E9E9E9]" />
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                      Phone Number
                    </p>
                    <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                      {companyInfo.phoneNumber || 'N/A'}
                    </p>
                  </div>
                  <div className="w-px bg-[#E9E9E9]" />
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                      Type
                    </p>
                    <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                      {getTypeLabel(companyInfo.type)}
                    </p>
                  </div>
                </div>

                {/* Address Block */}
                <div className="space-y-4">
                  <h4 className="font-gotham text-sm font-normal text-[#101828] leading-[1.71]">
                    Address
                  </h4>
                  <div className="bg-[#F9FAFB] rounded-md px-4 py-[10px] flex gap-6">
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                        Line 1
                      </p>
                      <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                        {companyInfo.addressLine1}
                      </p>
                    </div>
                    <div className="w-px bg-[#E9E9E9]" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                        Line 2
                      </p>
                      <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                        {companyInfo.addressLine2 || 'N/A'}
                      </p>
                    </div>
                    <div className="w-px bg-[#E9E9E9]" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                        City
                      </p>
                      <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                        {companyInfo.city}
                      </p>
                    </div>
                    <div className="w-px bg-[#E9E9E9]" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                        State
                      </p>
                      <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                        {companyInfo.state}
                      </p>
                    </div>
                    <div className="w-px bg-[#E9E9E9]" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                        Postcode
                      </p>
                      <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                        {companyInfo.postcode}
                      </p>
                    </div>
                    <div className="w-px bg-[#E9E9E9]" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                        Country
                      </p>
                      <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                        {companyInfo.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          <Button
            onClick={onNext}
            className="w-full h-auto py-3 px-6 flex items-center justify-center gap-4 bg-[#007DC6] hover:bg-[#00649E] rounded-[10px]"
          >
            <span className="font-montserrat text-base font-medium text-white leading-[1.5]">
              Select Subscription
            </span>
            <ArrowRight className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}

