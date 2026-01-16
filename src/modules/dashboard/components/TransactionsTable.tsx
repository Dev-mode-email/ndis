import { cn } from '@/core/lib/utils'
import { DataTable, type DataTableColumn } from '@/core/components/ui/data-table'
import type { Transaction } from '@/core/types/transaction'
import { FileX, ArrowRight } from 'lucide-react'

interface TransactionsTableProps {
  transactions: Transaction[]
  isLoading?: boolean
  onViewAll?: () => void
  emptyMessage?: string
  maxItems?: number
}

const getStatusBadge = (status: Transaction['status']) => {
  const styles: Record<Transaction['status'], string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    DECLINED: 'bg-red-100 text-red-700',
    FAILED: 'bg-gray-100 text-gray-700',
  }
  return styles[status] || 'bg-gray-100 text-gray-700'
}

const formatAmount = (amount: number, type: Transaction['type']) => {
  const formatted = `$${Math.abs(amount).toLocaleString()}`
  if (type === 'EXPENSE') {
    return `-${formatted}`
  }
  return `+${formatted}`
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

export const TransactionsTable = ({
  transactions,
  isLoading,
  onViewAll,
  emptyMessage = 'No Transaction',
  maxItems = 5,
}: TransactionsTableProps) => {
  const safeTransactions = Array.isArray(transactions) ? transactions : []
  const displayedTransactions = safeTransactions.slice(0, maxItems)

  const columns: DataTableColumn<Transaction>[] = [
    {
      key: 'description',
      header: 'Description',
      headerClassName:
        'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      cellClassName: 'px-6 py-4 whitespace-nowrap',
      render: (transaction) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {transaction.description || transaction.transactionPartner || 'Transaction'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {transaction.id.slice(0, 8)}
          </p>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      headerClassName:
        'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      cellClassName: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400',
      render: (transaction) => formatDate(transaction.createdAt),
    },
    {
      key: 'status',
      header: 'Status',
      headerClassName:
        'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      cellClassName: 'px-6 py-4 whitespace-nowrap',
      render: (transaction) => (
        <span
          className={cn('px-2 py-1 text-xs font-medium rounded-full', getStatusBadge(transaction.status))}
        >
          {transaction.status}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      headerClassName:
        'px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      cellClassName: 'px-6 py-4 whitespace-nowrap text-right',
      render: (transaction) => (
        <span
          className={cn(
            'text-sm font-semibold',
            transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
          )}
        >
          {formatAmount(transaction.amount, transaction.type)}
        </span>
      ),
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <DataTable
        columns={columns}
        data={displayedTransactions}
        isLoading={isLoading}
        loadingContent={
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
            <p className="text-gray-500 mt-2">Loading...</p>
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
                  <p className="text-[24px] leading-8 font-medium text-[#242A32]">
                    {emptyMessage}
                  </p>
                  <p className="mt-2 max-w-[402px] text-[16px] leading-6 text-[#475467]">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                    officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
                    nostrud amet.
                  </p>
                </div>
              </div>
              {onViewAll && (
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

