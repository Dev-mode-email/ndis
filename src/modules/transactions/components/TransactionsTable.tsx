import { useState } from 'react'
import { cn } from '@/core/lib/utils'
import { DataTable, type DataTableColumn } from '@/core/components/ui/data-table'
import { Modal } from '@/core/components/ui/modals/Modal'
import { useCreateTransaction } from '@/core/hooks/transactions/useTransactions'
import { useWallets } from '@/core/hooks/wallets/useWallets'
import { useAuthStore } from '@/core/stores/authStore'
import { FileX, ArrowRight } from 'lucide-react'
import {
  TransactionSearchIcon,
  DocumentDownloadIcon,
  FilterEditIcon,
  SettingIcon,
  TransactionHistoryIcon,
} from '@/core/components/icons'

export interface TransactionRow {
  id: string
  createdAt: string
  createdTime: string
  ppan: string
  purchaseMadeBy: {
    name: string
    email: string
    avatarInitials?: string
  }
  approvalNumber: string
  activityName: string
  transactionPartner: string
  wallet: string
  walletDescription: string
  activityStatus: 'PENDING' | 'APPROVED' | 'DECLINED' | 'FAILED'
  amount: string
}

interface TransactionsTableProps {
  transactions: TransactionRow[]
  isLoading?: boolean
  pagination?: {
    currentPage: number
    pageSize: number
    totalItems?: number
    totalPages?: number
    hasNextPage: boolean
    onFirst?: () => void
    onPrevious: () => void
    onNext: () => void
    onLast?: () => void
  }
}

const getStatusBadge = (status: TransactionRow['activityStatus']) => {
  const styles: Record<TransactionRow['activityStatus'], string> = {
    PENDING: 'bg-[#FEEDE6] text-[#DC6803]',
    APPROVED: 'bg-[#D1FADF] text-[#039855]',
    DECLINED: 'bg-[#FEF3F2] text-[#DE2525]',
    FAILED: 'bg-gray-50 text-[#475467]',
  }
  return styles[status] || 'bg-gray-50 text-[#475467]'
}


export const TransactionsTable = ({ transactions, isLoading, pagination }: TransactionsTableProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formState, setFormState] = useState({
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
    amount: '',
    description: '',
    transactionPartner: '',
    walletId: '',
  })
  const { mutateAsync: createTransaction, isPending: isSaving } = useCreateTransaction()
  const { data: wallets = [] } = useWallets()
  const user = useAuthStore((state) => state.user)
  const hasData = transactions.length > 0

  const handleDownload = () => {
    const csvContent = [
      [
        'ID',
        'Created at',
        'Ppan',
        'Purchase Made by',
        'Approval Number',
        'Activity Name',
        'Transaction Partner',
        'Wallet',
        'Activity Status',
        'Amount',
      ],
      ...transactions.map((t) => [
        t.id,
        `${t.createdAt} ${t.createdTime}`,
        t.ppan,
        t.purchaseMadeBy.name,
        t.approvalNumber,
        t.activityName,
        t.transactionPartner,
        t.wallet,
        t.activityStatus,
        t.amount,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const columns: DataTableColumn<TransactionRow>[] = [
    {
      key: 'id',
      header: 'ID',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[210px]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[210px] whitespace-pre-line',
      render: (row) => row.id,
    },
    {
      key: 'createdAt',
      header: 'Created at',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[110px]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[110px]',
      render: (row) => (
        <div className="flex flex-col gap-[6px]">
          <div className="text-[16px] leading-6">{row.createdAt}</div>
          <div className="text-[16px] leading-6">{row.createdTime}</div>
        </div>
      ),
    },
    {
      key: 'ppan',
      header: 'Ppan (Payment Primary Account Number)',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[148px]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[148px]',
      render: (row) => row.ppan,
    },
    {
      key: 'purchaseMadeBy',
      header: 'Purchase Made by',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[336px]',
      cellClassName: 'px-3 py-3 border-r border-[#EAECF0] w-[336px]',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAECF0] border border-[#D0D5DD] text-[16px] font-medium text-black shrink-0">
            {row.purchaseMadeBy.avatarInitials ?? 'JB'}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-[16px] leading-6">{row.purchaseMadeBy.name}</span>
            <span className="text-[16px] leading-6 text-[#344054]">{row.purchaseMadeBy.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'approvalNumber',
      header: 'Approval Number',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[169px]',
      render: (row) => (
        <span className="font-bold text-[#007DC6]">{row.approvalNumber}</span>
      ),
    },
    {
      key: 'activityName',
      header: 'Activity Name',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[144px]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[144px]',
      render: (row) => row.activityName,
    },
    {
      key: 'transactionPartner',
      header: 'Transaction Partner',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[185px]',
      render: (row) => row.transactionPartner,
    },
    {
      key: 'wallet',
      header: 'Wallet',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[119px]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[119px]',
      render: (row) => row.wallet,
    },
    {
      key: 'walletDescription',
      header: 'Wallet Description',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[175px]',
      render: (row) => (
        <span className="line-clamp-2 text-[16px] text-[#344054] h-[48px]">{row.walletDescription}</span>
      ),
    },
    {
      key: 'activityStatus',
      header: 'Activity Status',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[141px]',
      render: (row) => (
        <span
          className={cn(
            'rounded-[200px] px-3 py-[14px] text-[16px] font-medium leading-[18px] inline-block',
            getStatusBadge(row.activityStatus)
          )}
        >
          {row.activityStatus}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      headerClassName:
        'px-3 py-3 text-[16px] font-medium text-[#344054]',
      cellClassName: 'px-3 py-4 w-[92px]',
      render: (row) => (
        <span className="text-[#007DC6] font-bold text-[16px]">{row.amount}</span>
      ),
    },
  ]

  return (
    <div className="rounded-[10px] bg-white shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div>
          <h2 className="text-[24px] leading-[32px] font-medium text-[#242A32]">Transactions</h2>
          <p className="mt-1 text-[14px] leading-5 text-[#667085]">
            Filter, select and download
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={!hasData}
            className="inline-flex items-center gap-3 rounded-[10px] bg-[#E8F6FE] px-6 py-3 text-[16px] font-medium text-[#007DC6] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Transactions
            <DocumentDownloadIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-3 rounded-[10px] bg-[#007DC6] px-6 py-3 text-[16px] font-medium text-white"
          >
            Add a Transaction Record
            <TransactionHistoryIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 px-5 pb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 rounded-[10px] border border-[#F2F4F7] bg-white px-3 py-3 text-[16px] text-[#98A2B3]">
            <TransactionSearchIcon className="h-6 w-6" />
            <span className="flex-1">Search Transaction (Full Name, Email, ID)</span>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-0 py-3 text-[16px] font-medium text-[#007DC6]"
        >
          Settings
          <SettingIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-0 py-3 text-[16px] font-medium text-[#007DC6]"
        >
          Filter Transactions
          <FilterEditIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Table */}
      <div className="border-t border-[#EAECF0]">
        <div className="overflow-x-auto">
          <div className="min-w-[1829px]">
            <DataTable
              columns={columns}
              data={transactions}
              isLoading={isLoading}
            loadingContent={
              <div className="flex items-center justify-center py-10 text-sm text-[#667085]">
                Loading transactions...
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
                        No Data Transactions
                      </p>
                      <p className="mt-2 max-w-[402px] text-[16px] leading-6 text-[#475467]">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                        Velit officia consequat duis enim velit mollit. Exercitation veniam consequat
                        sunt nostrud amet.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0071CE] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#005fae] transition-colors"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            }
              className="w-full"
            />
          </div>
        </div>

        {/* Pagination */}
        {hasData && pagination && (
          <div className="flex items-center justify-between gap-8 bg-[#F9FAFB] border-t border-[#F2F4F7] px-4 py-2 rounded-b-[8px] text-[14px] text-[#0A1420]">
            <div className="flex items-center gap-[15px]">
              <div className="flex items-center gap-2">
                <div className="rounded-[6px] border border-[#F3F3F3] bg-white pl-2 pr-[7px] py-[6px] text-[14px]">
                  {pagination.pageSize}
                </div>
                <span className="text-[14px] leading-[18px]">Transactions per page</span>
              </div>
              <div className="h-4 w-px bg-[#EAECF0]" />
              <span className="font-bold tracking-[-0.28px] text-[14px] leading-[18px]">
                {(pagination.totalItems ?? transactions.length)} Transactions
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-[10px] bg-white px-6 py-3 text-[16px] font-medium text-[#98A2B3]"
                  onClick={pagination.onFirst}
                  disabled={pagination.currentPage === 1}
                >
                  First
                </button>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-[5px] border border-[#F1F1F1] bg-white disabled:opacity-50"
                  onClick={pagination.onPrevious}
                  disabled={pagination.currentPage === 1}
                >
                  <span className="text-sm">‹</span>
                </button>
              </div>
              <span className="text-[14px] leading-[18px]">
                Page {pagination.currentPage} of {pagination.totalPages ?? pagination.currentPage}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-[5px] border border-[#F1F1F1] bg-white disabled:opacity-50"
                  onClick={pagination.onNext}
                  disabled={!pagination.hasNextPage}
                >
                  <span className="text-sm">›</span>
                </button>
                <button
                  type="button"
                  className="rounded-[10px] bg-white px-6 py-3 text-[16px] font-medium text-[#98A2B3]"
                  onClick={pagination.onLast}
                  disabled={!pagination.hasNextPage && (pagination.totalPages ?? pagination.currentPage) === pagination.currentPage}
                >
                  Last
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      <Modal
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Add Transaction"
        className="max-w-[480px] w-full"
      >
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            if (!formState.amount || !formState.description || !formState.walletId) {
              return
            }
            if (!user?.userId) {
              return
            }
            await createTransaction({
              type: formState.type,
              amount: parseFloat(formState.amount),
              walletId: formState.walletId,
              userId: user.userId.toString(),
              description: formState.description,
              transactionPartner: formState.transactionPartner,
            })
            setIsAddOpen(false)
            setFormState({
              type: 'EXPENSE',
              amount: '',
              description: '',
              transactionPartner: '',
              walletId: '',
            })
          }}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">Wallet</label>
            {wallets.length === 0 ? (
              <div className="rounded-[10px] border border-[#FEE4E2] bg-[#FEF3F2] px-3 py-2 text-sm text-[#D92D20]">
                No wallets available. Please create a wallet first.
              </div>
            ) : (
              <select
                required
                value={formState.walletId}
                onChange={(e) => setFormState((s) => ({ ...s, walletId: e.target.value }))}
                className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
              >
                <option value="">Select a wallet</option>
                {wallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name} {wallet.balance !== undefined ? `($${wallet.balance.toLocaleString()})` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">Type</label>
            <select
              value={formState.type}
              onChange={(e) =>
                setFormState((s) => ({ ...s, type: e.target.value as 'INCOME' | 'EXPENSE' }))
              }
              className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">Amount</label>
            <input
              type="number"
              required
              step="0.01"
              value={formState.amount}
              onChange={(e) => setFormState((s) => ({ ...s, amount: e.target.value }))}
              className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">Description</label>
            <input
              type="text"
              required
              value={formState.description}
              onChange={(e) => setFormState((s) => ({ ...s, description: e.target.value }))}
              className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
              placeholder="Enter description"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">Transaction Partner</label>
            <input
              type="text"
              value={formState.transactionPartner}
              onChange={(e) =>
                setFormState((s) => ({ ...s, transactionPartner: e.target.value }))
              }
              className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
              placeholder="Enter partner name"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="rounded-[10px] border border-[#D0D5DD] px-4 py-2 text-sm font-medium text-[#344054]"
              onClick={() => {
                setIsAddOpen(false)
                setFormState({
                  type: 'EXPENSE',
                  amount: '',
                  description: '',
                  transactionPartner: '',
                  walletId: '',
                })
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || wallets.length === 0 || !user?.userId}
              className="rounded-[10px] bg-[#007DC6] px-4 py-2 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

