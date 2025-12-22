import { Button } from '@/core/components/ui/button'
import { CardAddIcon } from '@/core/components/icons/CardAddIcon'

interface OrderCardProps {
  onBack: () => void
  onNext: () => void
}

export const OrderCard = ({ onBack, onNext }: OrderCardProps) => {
  return (
    <div className="w-full max-w-[600px]">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CardAddIcon className="w-8 h-8 text-primary-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Card</h1>
        
        <p className="text-gray-600 mb-8">
          Order a physical debit card for your participant. The card will be delivered 
          to the address you provided and can be used for everyday purchases.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Card Features:</h3>
          <ul className="text-left space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              VISA debit card
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              Contactless payments
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              Online shopping enabled
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              ATM withdrawals
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1 h-12">
            Back
          </Button>
          <Button onClick={onNext} className="flex-1 h-12">
            Order Card
          </Button>
        </div>
      </div>
    </div>
  )
}






