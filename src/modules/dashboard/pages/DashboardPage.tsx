import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { useWallets } from '@/core/hooks/wallets/useWallets'
import { useAllTransactions } from '@/core/hooks/transactions/useTransactions'
import { ROUTES } from '@/core/constants/routes'
import { WalletCard } from '../components/WalletCard'
import { TransactionsTable } from '../components/TransactionsTable'
import { DepositsTable } from '../components/DepositsTable'
import { Wallet, Plus, ArrowRight } from 'lucide-react'

export const DashboardPage = () => {
  useDocumentTitle('Dashboard')
  const navigate = useNavigate()

  const { data: wallets = [], isLoading: walletsLoading } = useWallets()
  const { data: transactions = [], isLoading: transactionsLoading } = useAllTransactions()

  // Sort wallets by balance for "Top Wallets"
  const topWallets = [...wallets]
    .sort((a, b) => (b.balance || 0) - (a.balance || 0))
    .slice(0, 4)

  return (
    <div className="min-h-full bg-[#F9FAFB] px-8 py-8 space-y-8">
      <div className="space-y-8 mt-8">
        {/* Top Wallets Section */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] leading-8 font-medium text-[#344054]">Top Wallets</h2>
              <button
              type="button"
                onClick={() => navigate(ROUTES.WALLETS.INDEX)}
              className="inline-flex items-center gap-2 text-[16px] font-medium text-[#007DC6] hover:text-[#00649E]"
              >
              View All
              <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          <div className="rounded-xl bg-transparent">
            {walletsLoading ? (
              <div className="flex justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0071CE]/30 border-t-[#0071CE]" />
              </div>
            ) : wallets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E6EFFA]">
                  <Wallet className="h-8 w-8 text-[#0071CE]" />
                </div>
                <p className="mb-2 text-base font-semibold text-gray-900">No wallets yet</p>
                <p className="mb-4 text-sm text-gray-500">
                  Create your first wallet to start managing participant funds.
                  </p>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.WALLETS.INDEX)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0071CE] px-5 py-2 text-sm font-semibold text-white hover:bg-[#005fae] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create Wallet
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-6">
                {topWallets.map((wallet) => (
                  <div key={wallet.id} className="w-full md:w-[calc(33.333%-16px)] max-w-sm">
                    <WalletCard wallet={wallet} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[24px] leading-8 font-medium text-[#344054]">
                Recent Transactions
              </h2>
              <p className="mt-2 max-w-xl text-[14px] leading-5 text-[#667085]">
                These are the details of the transactions made
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(ROUTES.TRANSACTIONS.INDEX)}
              className="inline-flex items-center gap-2 text-[16px] font-medium text-[#007DC6] hover:text-[#00649E]"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

              <TransactionsTable
                transactions={transactions}
                isLoading={transactionsLoading}
            emptyMessage="No Transaction"
            maxItems={5}
                onViewAll={() => navigate(ROUTES.TRANSACTIONS.INDEX)}
          />
        </section>

        {/* Deposits */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[24px] leading-8 font-medium text-[#344054]">Deposits</h2>
              <p className="mt-2 max-w-xl text-[14px] leading-5 text-[#667085]">
                These are the details of the deposit made
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(ROUTES.TRANSACTIONS.INDEX)}
              className="inline-flex items-center gap-2 text-[16px] font-medium text-[#007DC6] hover:text-[#00649E]"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </button>
            </div>

              <DepositsTable
                transactions={transactions}
                isLoading={transactionsLoading}
            maxItems={5}
                onViewAll={() => navigate(ROUTES.TRANSACTIONS.INDEX)}
              />
        </section>
      </div>
    </div>
  )
}
