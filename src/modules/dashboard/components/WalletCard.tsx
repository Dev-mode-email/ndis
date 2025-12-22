import { cn } from '@/core/lib/utils'
import type { Wallet } from '@/core/types/wallet'

interface WalletCardProps {
  wallet: Wallet
  variant?: 'default' | 'compact'
}

const getStatusColor = (status: Wallet['status']) => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-700'
    case 'INACTIVE':
      return 'bg-gray-100 text-gray-700'
    case 'SUSPENDED':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getWalletInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatCurrency = (amount: number, currency: string) => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    AUD: '$',
  }
  return `${symbols[currency] || '$'}${amount.toLocaleString()}`
}

export const WalletCard = ({ wallet, variant = 'default' }: WalletCardProps) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
              {getWalletInitials(wallet.name)}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white text-sm">
              {wallet.name}
            </p>
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full',
                getStatusColor(wallet.status)
              )}
            >
              {wallet.status}
            </span>
          </div>
        </div>
        <p className="font-semibold text-gray-900 dark:text-white">
          {formatCurrency(wallet.balance || 0, wallet.currency)}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {getWalletInitials(wallet.name)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {wallet.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {wallet.displayId || wallet.id.slice(0, 8)}
            </p>
          </div>
        </div>
        <span
          className={cn(
            'text-xs px-2 py-1 rounded-full font-medium',
            getStatusColor(wallet.status)
          )}
        >
          {wallet.status}
        </span>
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(wallet.balance || 0, wallet.currency)}
        </p>
      </div>
    </div>
  )
}

