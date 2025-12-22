import { useState } from 'react'
import { Button } from '@/core/components/ui/button'
import { ArrowRight, Building2, Users, User } from 'lucide-react'
import { ArrowLeftIcon } from '@/core/components/icons/ArrowLeftIcon'

export type UserType = 'individual' | 'multiple' | 'provider' | 'government'

interface UserTypeOption {
  id: UserType
  icon: React.ReactNode
  title: string
  subtitle: string
}

interface UserTypeSelectionProps {
  onBack: () => void
  onNext: (userType: UserType) => void
  defaultValue?: UserType
}

export const UserTypeSelection = ({ onBack, onNext, defaultValue }: UserTypeSelectionProps) => {
  const [selectedType, setSelectedType] = useState<UserType | null>(defaultValue || null)

  const userTypes: UserTypeOption[] = [
    {
      id: 'individual',
      icon: <User className="w-16 h-16 text-primary-500" />,
      title: 'Individual participant',
      subtitle: "I'm setting PayConneX for an",
    },
    {
      id: 'multiple',
      icon: <Users className="w-16 h-16 text-primary-500" />,
      title: 'Multiple participants',
      subtitle: "I'm referring",
    },
    {
      id: 'provider',
      icon: <Building2 className="w-16 h-16 text-primary-500" />,
      title: 'Service provider',
      subtitle: "I'm setting PayConneX for a",
    },
    {
      id: 'government',
      icon: <Building2 className="w-16 h-16 text-primary-500" />,
      title: 'Government Organisation',
      subtitle: "I'm setting up Pay ConneX for a",
    },
  ]

  const handleNext = () => {
    if (selectedType) {
      onNext(selectedType)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start lg:items-center w-full max-w-7xl mx-auto px-4 lg:px-0">
      {/* Left Column - Header and Buttons */}
      <div className="w-full lg:w-[462px] space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="font-gotham text-4xl lg:text-5xl font-bold text-gray-900 leading-tight lg:leading-[58px]">
            Which one best describes you?
          </h1>
          <p className="font-gotham text-lg lg:text-xl font-normal text-primary-500 leading-relaxed lg:leading-[30px]">
            Lorem ipsum dolor sit amet consectetur. Sed condimentum aenean in suscipit lacus sed adipiscing. Varius nunc scelerisque
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 h-12 text-base font-medium text-gray-400 bg-white border-gray-300"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={!selectedType}
            className="flex-1 h-12 text-base font-medium"
          >
            Proceed to next Step
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Right Column - User Type Options */}
      <div className="space-y-4 flex-1 w-full">
        {userTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => setSelectedType(type.id)}
            className={`w-full flex items-center gap-4 lg:gap-6 p-6 lg:p-8 rounded-2xl border-2 transition-all ${
              selectedType === type.id
                ? 'bg-white border-primary-500 shadow-lg'
                : 'bg-white border-gray-200 shadow hover:shadow-md hover:border-gray-300'
            }`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-gray-50 rounded-[10px] border border-gray-200">
              {type.icon}
            </div>

            {/* Text */}
            <div className="flex-1 text-left min-w-0">
              <p className="font-gotham text-base lg:text-xl font-normal text-primary-500 leading-relaxed lg:leading-[30px] truncate">
                {type.subtitle}
              </p>
              <h3 className="font-gotham text-2xl lg:text-4xl font-bold text-primary-700 leading-tight lg:leading-[44px] uppercase break-words">
                {type.title}
              </h3>
            </div>

            {/* Toggle */}
            <div
              className={`flex-shrink-0 w-[54px] h-[30px] rounded-[18px] p-[3px] transition-colors ${
                selectedType === type.id ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform shadow-sm ${
                  selectedType === type.id ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

