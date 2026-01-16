import { ArrowLeft, Check, Circle, LayoutDashboard, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from '@/core/components/common/Logo'

interface Step {
  number: number
  label: string
  completed: boolean
  current: boolean
}

interface ProgressSidebarProps {
  currentStep: number
  isSuccessScreen?: boolean
}

export const ProgressSidebar = ({ currentStep, isSuccessScreen = false }: ProgressSidebarProps) => {
  const location = useLocation()

  const isCompanySuccess = isSuccessScreen && currentStep === 2
  const isSubscriptionSuccess = isSuccessScreen && currentStep === 3
  const isParticipantSuccess = isSuccessScreen && currentStep === 4

  const effectiveStep = isParticipantSuccess ? 5 : isSubscriptionSuccess ? 4 : isCompanySuccess ? 3 : currentStep
  
  const step1Completed = currentStep >= 1
  const step2Completed = isCompanySuccess || currentStep > 2
  const step3Completed = isSubscriptionSuccess || currentStep > 3
  const step4Completed = isParticipantSuccess || currentStep > 4

  const steps: Step[] = [
    { number: 1, label: '1: Add Organisation', completed: step1Completed, current: effectiveStep === 1 },
    { number: 2, label: '2: Organisation', completed: step2Completed, current: effectiveStep === 2 && !isCompanySuccess },
    { number: 3, label: '3: Select a Subscription', completed: step3Completed, current: effectiveStep === 3 && !isSubscriptionSuccess },
    { number: 4, label: '4: Add a Participant', completed: step4Completed, current: effectiveStep === 4 && !isParticipantSuccess },
    { number: 5, label: '5: Add Wallet', completed: effectiveStep > 5, current: effectiveStep === 5 },
    { number: 6, label: '6: Order Card', completed: effectiveStep > 6, current: effectiveStep === 6 },
  ]

  let progressPercentage: number
  if (isParticipantSuccess) {
    progressPercentage = 67
  } else if (isSubscriptionSuccess) {
    progressPercentage = 60
  } else if (isCompanySuccess) {
    progressPercentage = 40
  } else if (currentStep === 1) {
    progressPercentage = 30
  } else {
    const completedSteps = steps.filter((s) => s.completed).length
    progressPercentage = Math.round((completedSteps / steps.length) * 100)
  }

  return (
    <aside className="hidden lg:flex flex-col w-[260px] min-h-screen bg-white border-r border-[#F2F4F7]">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <Logo className="h-[50px] w-auto" clickable={false} />
      </div>

      {/* Progress card */}
      <div className="px-5">
        <div className="bg-[#E8F6FE] rounded-[6px] px-3 py-4 flex flex-col gap-3">
          <div className="space-y-1">
            <p className="font-montserrat text-[15px] font-bold text-[#00649E] leading-[24px]">
              PayConneX Registration
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[6px] bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#43844C] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-[12px] font-normal text-[#00649E]">{progressPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="mt-4 px-5">
        <div className="border-t border-[#F2F4F7]" />
        <div className="pt-4 space-y-3">
          <p className="text-[16px] font-semibold text-[#344054]">Steps:</p>
          <div className="space-y-2">
            {steps.map((step) => {
              const baseClasses =
                'flex items-center gap-2 px-2 py-3 rounded-[4px] text-[14px] font-medium transition-colors'
              const activeClasses = step.current ? 'bg-[#E8F6FE] text-[#475467]' : 'text-[#475467]'
              return (
                <div key={step.number} className={`${baseClasses} ${activeClasses}`}>
                  <div className="shrink-0">
                    {step.completed ? (
                      <div className="bg-[#12B76A] p-[2px] rounded-full">
                        <Check className="w-[14px] h-[14px] text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <Circle className="w-[18px] h-[18px] text-[#98A2B3]" strokeWidth={2} />
                    )}
                  </div>
                  <span className="flex-1">{step.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {/* Footer buttons */}
      <div className="p-7 space-y-3">
        <Link
          to="/dashboard"
          className="block w-full text-center bg-[#007DC6] text-white rounded-[10px] px-6 py-3 text-[16px] font-medium hover:bg-[#00649E] transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/auth/login"
          className="block w-full rounded-[10px] border border-[#F2F4F7] overflow-hidden"
        >
          <div className="bg-[#E8F6FE] flex items-center justify-center gap-3 px-6 py-3 text-[#007DC6] text-[16px] font-medium hover:bg-[#D2EFFF] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Exit
          </div>
        </Link>
      </div>
    </aside>
  )
}
