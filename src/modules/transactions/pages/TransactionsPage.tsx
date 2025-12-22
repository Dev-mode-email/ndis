import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { TransactionsTable, type TransactionRow } from '@/modules/transactions/components/TransactionsTable'
import { useTransactionsPaginated } from '@/core/hooks/transactions/useTransactions'
import { usePagination } from '@/core/hooks/data/usePagination'
import type { Transaction } from '@/core/types/transaction'

const mapTransactionsToRows = (transactions: Transaction[]): TransactionRow[] =>
  transactions.map((t) => {
    const date = t.createdAt
      ? new Date(t.createdAt).toLocaleDateString('en-AU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '-'
    const time = t.createdAt
      ? new Date(t.createdAt).toLocaleTimeString('en-AU', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      : ''

    const baseName = t.transactionPartner || 'Unknown'
    const initials = baseName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase()

    return {
      id: t.id,
      createdAt: date,
      createdTime: time,
      ppan: t.ppan ? `**** **** ${t.ppan.slice(-4)}` : '-',
      purchaseMadeBy: {
        name: baseName,
        email: `${baseName.toLowerCase().replace(/\s+/g, '.')}@payconnex.com`,
        avatarInitials: initials,
      },
      approvalNumber: t.id.slice(0, 7).toUpperCase(),
      activityName: t.description || 'Entertainment',
      transactionPartner: t.transactionPartner || 'Unknown',
      wallet: 'Cash Wallet',
      walletDescription: 'A simple cash wallet for spending money',
      activityStatus: t.status,
      amount: `$${Math.abs(t.amount).toLocaleString('en-AU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    }
  })

export const TransactionsPage = () => {
  useDocumentTitle('View Transactions')
  const { currentPage, pageSize, updateCurrentPage } = usePagination(1, 6)

  const { data: transactionsResult, isLoading } = useTransactionsPaginated({
    page: currentPage,
    limit: pageSize,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  })

  const transactionsData = transactionsResult?.items ?? []
  const transactions: TransactionRow[] = mapTransactionsToRows(transactionsData)

  const totalPages = transactionsResult?.meta.totalPages ?? (transactions.length > 0 ? currentPage + 1 : 1)
  const hasNextPage =
    transactionsResult?.meta.totalPages !== undefined
      ? currentPage < (transactionsResult.meta.totalPages ?? 1)
      : transactions.length === pageSize

  return (
    <div className="min-h-full bg-[#F9FAFB] px-8 py-8">
      <div className="mt-8">
        <TransactionsTable
          transactions={transactions}
          isLoading={isLoading}
          pagination={{
            currentPage,
            pageSize,
            totalItems: transactionsResult?.meta.totalItems,
            totalPages,
            hasNextPage,
            onFirst: () => updateCurrentPage(1),
            onPrevious: () => updateCurrentPage(Math.max(1, currentPage - 1)),
            onNext: () => {
              if (hasNextPage) {
                updateCurrentPage(currentPage + 1)
              }
            },
            onLast: () => {
              if (totalPages) {
                updateCurrentPage(totalPages)
              }
            },
          }}
        />
      </div>
    </div>
  )
}

