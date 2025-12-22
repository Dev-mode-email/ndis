import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/core/components/ui/button'

interface SelectSubscriptionProps {
  onBack: () => void
  onNext: () => void
}

interface Plan {
  id: string
  name: string
  price: string
  period: string
  features: string[]
}

const plans: Plan[] = [
  {
    id: 'paid',
    name: '$5 / Month',
    price: '$5',
    period: 'Per/Participant',
    features: [
      'Includes up to 10 features',
      '$5 per month per additional feature',
      'VISA debit cards for cardless payments',
      'Categorised spending reports',
      'Automated record consolidation',
      'Weekly & fortnightly payment reporting',
      'Participant account to support capacity building',
      'Manage client details, claim costs, and fees easily to new and old',
      'Complimentary training and education resources',
    ],
  },
  {
    id: 'free',
    name: 'Free',
    price: 'Free',
    period: 'For Now',
    features: [
      'Set up an account for participants',
      'Track card spend for a participant',
      'Share receipts and photos',
      'Subscription',
      'Unlimited payments for parents, admin, or support workers',
      'Unlimited accounts cost standard, additional participants are $3.50 per month',
    ],
  },
]

export const SelectSubscription = ({ onBack, onNext }: SelectSubscriptionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="w-full max-w-[900px]">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Select a Subscription Plan</h1>

      <div className="grid grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? 'border-primary-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.period}</p>
              </div>
              <Button
                variant={selectedPlan === plan.id ? 'default' : 'outline'}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPlan(plan.id)
                }}
              >
                Select +
              </Button>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Includes:</p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12">
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!selectedPlan}
          className="flex-1 h-12"
        >
          Next Step
        </Button>
      </div>
    </div>
  )
}









