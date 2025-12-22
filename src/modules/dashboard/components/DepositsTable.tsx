import { DataTable, type DataTableColumn } from '@/core/components/ui/data-table'
import type { Transaction } from '@/core/types/transaction'
import { ArrowRight, FileX } from 'lucide-react'

interface DepositsTableProps {
  transactions: Transaction[]
  isLoading?: boolean
  showViewAll?: boolean
  onViewAll?: () => void
  maxItems?: number
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const DepositsTable = ({
  transactions,
  isLoading,
  showViewAll = true,
  onViewAll,
  maxItems = 5,
}: DepositsTableProps) => {
  // Protection against non-arrays: if transactions is not an array, use empty array
  const safeTransactions = Array.isArray(transactions) ? transactions : []
  // Filter only INCOME transactions (deposits)
  const deposits = safeTransactions
    .filter((t) => t.type === 'INCOME')
    .slice(0, maxItems)

  const columns: DataTableColumn<Transaction>[] = [
    {
      key: 'description',
      header: 'Description',
      headerClassName:
        'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      cellClassName: 'px-6 py-4 whitespace-nowrap',
      render: (deposit) => (
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {deposit.description || deposit.transactionPartner || 'Deposit'}
        </p>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      headerClassName:
        'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      cellClassName: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400',
      render: (deposit) => formatDate(deposit.createdAt),
    },
    {
      key: 'amount',
      header: 'Amount',
      headerClassName:
        'px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      cellClassName: 'px-6 py-4 whitespace-nowrap text-right',
      render: (deposit) => (
        <span className="text-sm font-semibold text-green-600">
          +${deposit.amount.toLocaleString()}
        </span>
      ),
    },
  ]

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <DataTable
        columns={columns}
        data={deposits}
        isLoading={isLoading}
        loadingContent={
          <div className="p-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#0071CE]/30 border-t-[#0071CE]" />
            <p className="mt-2 text-sm text-gray-500">Loading...</p>
          </div>
        }
        emptyContent={
          <div className="px-10 py-10">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6EFFA]">
                  <FileX className="h-8 w-8 text-[#0071CE]" />
                </div>
                <div>
                  <p className="text-[24px] leading-8 font-medium text-[#242A32]">No Data Available</p>
                  <p className="mt-2 max-w-[402px] text-[16px] leading-6 text-[#475467]">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                    officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
                    nostrud amet.
                  </p>
                </div>
              </div>
              {showViewAll && onViewAll && (
                <button
                  type="button"
                  onClick={onViewAll}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0071CE] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#005fae] transition-colors"
                >
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        }
        className="w-full"
      />
    </div>
  )
}

