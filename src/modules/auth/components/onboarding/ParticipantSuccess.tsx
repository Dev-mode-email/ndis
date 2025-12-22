import { ArrowRight } from 'lucide-react'
import { Button } from '@/core/components/ui/button'
import { FilterEditIcon } from '@/core/components/icons'

interface ParticipantSuccessProps {
  participantData: {
    firstName: string
    lastName: string
    email: string
    phoneNumber?: string
    dateOfBirth?: string
    gender?: string
    ndisNumber?: string
  }
  onNext: () => void
  onGoToDashboard: () => void
  onEdit?: () => void
}

export const ParticipantSuccess = ({
  participantData,
  onNext,
  onGoToDashboard,
  onEdit,
}: ParticipantSuccessProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-[880px] bg-white rounded-2xl border border-gray-100 shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)]">
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
            Your Onboarding is Complete!
          </h2>
          <p className="font-montserrat text-sm font-medium text-[#027A48] leading-[1.43] text-center">
            You have successfully onboarded a new Participant
          </p>
        </div>

        {/* Content */}
        <div className="px-5 py-6 flex flex-col items-center gap-8">
          {/* Participant Info Section */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-gotham text-base font-normal text-[#101828] leading-[1.5] flex-1">
                Participant Info
              </h3>
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="text-[#007DC6] hover:text-[#00649E] transition-colors shrink-0"
                  aria-label="Edit participant info"
                >
                  <FilterEditIcon className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* First Row: Gender, Full Name, DOB, User Email */}
            <div className="bg-[#F9FAFB] rounded-md px-4 py-[10px] flex gap-6">
              {participantData.gender && (
                <>
                  <div className="flex flex-col gap-1">
                    <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                      Gender
                    </p>
                    <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                      {participantData.gender}
                    </p>
                  </div>
                  <div className="w-px bg-[#E9E9E9]" />
                </>
              )}
              <div className="flex flex-col gap-1">
                <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                  Full Name
                </p>
                <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                  {participantData.firstName} {participantData.lastName}
                </p>
              </div>
              {participantData.dateOfBirth && (
                <>
                  <div className="w-px bg-[#E9E9E9]" />
                  <div className="flex flex-col gap-1">
                    <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                      DOB
                    </p>
                    <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                      {participantData.dateOfBirth}
                    </p>
                  </div>
                </>
              )}
              <div className="w-px bg-[#E9E9E9]" />
              <div className="flex flex-col gap-1">
                <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                  User Email
                </p>
                <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                  {participantData.email}
                </p>
              </div>
            </div>

            {/* Second Row: Contact, NDIS */}
            {(participantData.phoneNumber || participantData.ndisNumber) && (
              <div className="bg-[#F9FAFB] rounded-md px-4 py-[10px] flex gap-6">
                {participantData.phoneNumber && (
                  <>
                    <div className="flex flex-col gap-1">
                      <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                        Contact
                      </p>
                      <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                        {participantData.phoneNumber}
                      </p>
                    </div>
                    {participantData.ndisNumber && (
                      <>
                        <div className="w-px bg-[#E9E9E9]" />
                        <div className="flex flex-col gap-1">
                          <p className="font-montserrat text-sm font-normal text-[#475467] leading-[1.43]">
                            NDIS
                          </p>
                          <p className="font-montserrat text-xl font-bold text-[#242A32] leading-[1.5]">
                            {participantData.ndisNumber}
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onNext}
              variant="outline"
              className="flex-1 h-auto py-3 px-6 font-montserrat text-base font-medium text-[#98A2B3] border-[#EAECF0] hover:bg-gray-50 rounded-[10px]"
            >
              Next Step
            </Button>
            <Button
              onClick={onGoToDashboard}
              className="flex-1 h-auto py-3 px-6 flex items-center justify-center gap-4 font-inter text-base font-medium text-white bg-[#007DC6] hover:bg-[#00649E] rounded-[10px]"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

