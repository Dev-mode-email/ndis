import { Button } from '@/core/components/ui/button'
import { Wallet } from 'lucide-react'

interface AddWalletProps {
  onBack: () => void
  onNext: () => void
}

export const AddWallet = ({ onBack, onNext }: AddWalletProps) => {
  return (
    <div className="w-full max-w-[600px]">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Wallet className="w-8 h-8 text-primary-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Add Wallet</h1>
        
        <p className="text-gray-600 mb-8">
          Set up a wallet for your participant to manage their funds securely. 
          You can add multiple wallets and configure spending limits.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Wallet Features:</h3>
          <ul className="text-left space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              Secure fund management
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              Real-time balance tracking
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              Spending limits and controls
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              Transaction history
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1 h-12">
            Back
          </Button>
          <Button onClick={onNext} className="flex-1 h-12">
            Add Wallet
          </Button>
        </div>
      </div>
    </div>
  )
}









