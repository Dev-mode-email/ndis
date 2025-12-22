import { Button } from '@/core/components/ui/button'
import { Building2 } from 'lucide-react'

interface OrganisationDetailsPlaceholderProps {
  type: 'multiple' | 'government'
  onBack: () => void
  onNext: () => void
}

export const OrganisationDetailsPlaceholder = ({ 
  type, 
  onBack, 
  onNext 
}: OrganisationDetailsPlaceholderProps) => {
  const title = type === 'multiple' 
    ? 'Multiple Participants Details' 
    : 'Government Organisation Details'

  return (
    <div className="w-full max-w-[888px]">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-700 px-6 py-10 space-y-2">
          <h1 className="font-gotham text-2xl font-normal text-white text-center leading-6">
            {title}
          </h1>
          <p className="font-gotham text-base font-light text-white text-center leading-6">
            Please provide your organisation information to continue setting up your account.
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="px-5 py-20 flex flex-col items-center justify-center space-y-6">
          <Building2 className="w-20 h-20 text-gray-300" />
          <div className="text-center space-y-2">
            <h2 className="font-gotham text-xl font-medium text-gray-900">
              Coming Soon
            </h2>
            <p className="font-gotham text-base text-gray-500">
              This section is under development
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-1 bg-gray-50" />

        {/* Footer with buttons */}
        <div className="bg-white px-5 py-3">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 h-12 text-base font-medium text-gray-400"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={onNext}
              className="flex-1 h-12 text-base font-medium"
            >
              Next Step
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

