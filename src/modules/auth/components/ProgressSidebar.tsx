import { Check, LayoutDashboard, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Step {
  number: number
  label: string
  completed: boolean
  current: boolean
}

interface ProgressSidebarProps {
  currentStep: number // Step in sidebar (1-7)
  userType?: string | null
}

export const ProgressSidebar = ({ currentStep }: ProgressSidebarProps) => {
  // Steps for sidebar (always 6 steps for all user types)
  const steps: Step[] = [
    { number: 1, label: 'Add Organisation', completed: currentStep > 1, current: currentStep === 1 },
    { number: 2, label: 'Organisation', completed: currentStep > 2, current: currentStep === 2 },
    { number: 3, label: 'Select a Subscription', completed: currentStep > 3, current: currentStep === 3 },
    { number: 4, label: 'Add a Participant', completed: currentStep > 4, current: currentStep === 4 },
    { number: 5, label: 'Add Wallet', completed: currentStep > 5, current: currentStep === 5 },
    { number: 6, label: 'Order Card', completed: currentStep > 6, current: currentStep === 6 },
  ]

  // Progress calculation
  const completedSteps = steps.filter(s => s.completed).length
  const progressPercentage = Math.round((completedSteps / steps.length) * 100)

  return (
    <div className="hidden lg:flex flex-col w-[220px] bg-[#F8F9FA] min-h-screen">
      {/* Logo */}
      <div className="px-4 pt-4 pb-2">
        <img src={`${import.meta.env.BASE_URL || '/'}logo.svg`} alt="PAY CONNEX" className="h-6" />
      </div>

      {/* Title and Progress */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">PayConneX Registration</h3>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-500">{progressPercentage}%</span>
        </div>
      </div>

      {/* Steps Label */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Steps</p>
      </div>

      {/* Steps */}
      <div className="flex-1 px-2">
        <div className="space-y-0.5">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className={`flex items-center gap-2.5 px-2 py-2.5 rounded-lg transition-all ${
                step.current 
                  ? 'bg-primary-50' 
                  : 'bg-transparent'
              }`}
            >
              {/* Step Circle */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 ${
                  step.completed
                    ? 'bg-primary-500 text-white'
                    : step.current
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.completed ? (
                  <Check className="w-3 h-3 stroke-[3]" />
                ) : (
                  step.number
                )}
              </div>

              {/* Step Label */}
              <span
                className={`text-xs font-medium ${
                  step.current
                    ? 'text-primary-700'
                    : step.completed
                    ? 'text-gray-700'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-2 py-4 mt-auto border-t border-gray-200">
        <Link 
          to="/dashboard" 
          className="flex items-center gap-2.5 px-2 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link 
          to="/auth/login" 
          className="flex items-center gap-2.5 px-2 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Exit
        </Link>
      </div>
    </div>
  )
}
