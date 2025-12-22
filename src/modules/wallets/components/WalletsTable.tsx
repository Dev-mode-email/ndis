import { useState } from 'react'
import { cn } from '@/core/lib/utils'
import { Switch } from '@/core/components/ui/switch'
import { Modal } from '@/core/components/ui/modals/Modal'
import { useCreateWallet } from '@/core/hooks/wallets/useWallets'
import { Pagination } from '@/core/components/ui/Pagination'
import walletAddIcon from '@/assets/icons/wallet-add.svg'
import walletSearchIcon from '@/assets/icons/wallet-search.svg'
import filterEditIcon from '@/assets/icons/filter-edit.svg'
import documentDownloadIcon from '@/assets/icons/document-download.svg'
import settingIcon from '@/assets/icons/setting.svg'

export interface WalletRow {
  id: string
  displayId: string
  walletName: string
  description: string
  memberName: string
  memberEmail: string
  balance: string
}

interface WalletsPaginationProps {
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

interface WalletsTableProps {
  wallets: WalletRow[]
  isLoading?: boolean
  pagination?: WalletsPaginationProps
}

export const WalletsTable = ({ wallets, isLoading, pagination }: WalletsTableProps) => {
  const [isStatusActive, setIsStatusActive] = useState(false)
  const [isArchive, setIsArchive] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    currency: 'USD' as 'USD' | 'EUR' | 'GBP',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED',
  })
  const { mutateAsync: createWallet, isPending: isSaving } = useCreateWallet()
  const hasData = wallets.length > 0
  const totalItems = pagination?.totalItems ?? wallets.length
  const totalPages = pagination?.totalPages ?? (pagination ? pagination.currentPage : 1)

  const handleDownload = () => {
    const csvContent = [
      ['ID', 'Display ID', 'Wallet Name', 'Description', 'Member', 'Balance'],
      ...wallets.map((w) => [
        w.id,
        w.displayId,
        w.walletName,
        w.description,
        w.memberName,
        w.balance,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `wallets_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="rounded-[10px] bg-white shadow-[0_27px_80px_rgba(8,12,58,0.04),0_9.855px_29.201px_rgba(8,12,58,0.03),0_4.785px_14.177px_rgba(8,12,58,0.02),0_2.346px_6.95px_rgba(8,12,58,0.02),0_0.927px_2.748px_rgba(8,12,58,0.01)] border border-[#EAECF0]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div>
          <h2 className="text-[24px] leading-8 font-medium text-[#242A32]">Wallets List</h2>
          <p className="mt-1 text-[14px] leading-5 text-[#667085]">
            Pick a wallet to view the details, edit budgets and connect users
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={!hasData}
            className="inline-flex items-center gap-3 rounded-[10px] bg-[#E8F6FE] px-6 py-3 text-[16px] font-medium text-[#007DC6] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Wallets
            <img src={documentDownloadIcon} alt="" className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-3 rounded-[10px] bg-[#007DC6] px-6 py-3 text-[16px] font-medium text-white"
          >
            Add Wallet
            <img src={walletAddIcon} alt="" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 px-5 pb-4">
        <button
          type="button"
          onClick={() => setIsStatusActive(!isStatusActive)}
          className="inline-flex items-center gap-[8px] rounded-[10px] border border-[#E4F1FF] bg-white px-4 py-3 text-[16px] text-[#98A2B3]"
        >
          <span className="text-left">Status is active</span>
          <span
            className={cn(
              'inline-flex h-5 w-5 items-center justify-center rounded border border-[#C4CFDF] bg-white',
              isStatusActive && 'bg-[#007DC6] border-[#007DC6]'
            )}
          >
            {isStatusActive && (
              <svg
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-between gap-3 rounded-[10px] border border-[#F2F4F7] bg-white px-4 py-3 text-[16px] text-[#98A2B3] min-w-[140px]"
        >
          <span>Types in</span>
          <span className="text-xs">▾</span>
        </button>
        <label className="inline-flex items-center gap-3 cursor-pointer">
          <span className="text-[16px] text-[#98A2B3]">Archive</span>
          <Switch
            checked={isArchive}
            onCheckedChange={setIsArchive}
            className="h-6 w-11 data-[state=checked]:bg-[#007DC6] data-[state=unchecked]:bg-[#F2F4F7]"
          />
        </label>
        <div className="flex-1">
          <div className="flex items-center gap-3 rounded-[10px] border border-[#F2F4F7] bg-white px-4 py-3 text-[16px] text-[#98A2B3]">
            <img src={walletSearchIcon} alt="" className="h-6 w-6" />
            <span className="flex-1">Search Wallet (Full Name, Email, ID)</span>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-[16px] font-medium text-[#007DC6]"
        >
          Settings
          <img src={settingIcon} alt="" className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-[16px] font-medium text-[#007DC6]"
        >
          Filter &amp; Sort
          <img src={filterEditIcon} alt="" className="h-6 w-6" />
        </button>
      </div>

      {/* Table */}
      <div className="border-t border-[#EAECF0]">
        {isLoading ? (
          <div className="flex items-center justify-center py-10 text-sm text-[#667085]">
            Loading wallets...
          </div>
        ) : !hasData ? (
          <div className="flex items-center justify-center py-10 text-sm text-[#667085]">
            No wallets found
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[210px_160px_180px_minmax(0,1fr)_220px_120px] bg-gray-50 border-b border-[#EAECF0] text-[16px] font-medium text-[#344054]">
              <div className="px-3 py-3 border-r border-[#EAECF0]">ID</div>
              <div className="px-3 py-3 border-r border-[#EAECF0]">Display ID</div>
              <div className="px-3 py-3 border-r border-[#EAECF0]">Wallet Name</div>
              <div className="px-3 py-3 border-r border-[#EAECF0]">Description</div>
              <div className="px-3 py-3 border-r border-[#EAECF0]">Member</div>
              <div className="px-3 py-3">Balance</div>
            </div>
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className="grid grid-cols-[210px_160px_180px_minmax(0,1fr)_220px_120px] border-b border-[#F2F4F7] text-[16px] text-[#344054]"
              >
                <div className="px-3 py-4 border-r border-[#EAECF0] whitespace-pre-line">
                  {wallet.id}
                </div>
                <div className="px-3 py-4 border-r border-[#EAECF0]">{wallet.displayId}</div>
                <div className="px-3 py-4 border-r border-[#EAECF0]">
                  <button
                    type="button"
                    className="border-b border-[#007DC6] text-[16px] font-medium text-[#007DC6]"
                  >
                    {wallet.walletName}
                  </button>
                </div>
                <div className="px-3 py-4 border-r border-[#EAECF0]">
                  <span className="line-clamp-2 text-[14px] text-[#667085]">
                    {wallet.description}
                  </span>
                </div>
                <div className="px-3 py-4 border-r border-[#EAECF0]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAECF0] border border-[#D0D5DD] text-[14px] font-medium text-black">
                      {wallet.memberName
                        .split(' ')
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((p) => p[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{wallet.memberName}</span>
                      <span className="truncate text-[14px] text-[#344054]">
                        {wallet.memberEmail}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-4 text-[#007DC6] font-bold">{wallet.balance}</div>
              </div>
            ))}

            {/* Pagination */}
            {pagination && (
              <div className="flex items-center justify-between gap-8 bg-gray-50 px-4 py-2 rounded-b-[10px] border-t border-[#F2F4F7] text-[14px] text-[#0A1420]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-[6px] border border-[#F3F3F3] px-2 py-1 text-[14px]">
                      {pagination.pageSize}
                    </div>
                    <span>Wallets per page</span>
                  </div>
                  <div className="h-4 w-px bg-[#EAECF0]" />
                  <span className="font-bold tracking-[-0.02em]">
                    {totalItems} wallets
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-[10px] bg-white px-6 py-2 text-[16px] font-medium text-[#98A2B3]"
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
                  <span>
                    Page {pagination.currentPage} of {totalPages}
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
                      className="rounded-[10px] bg-white px-6 py-2 text-[16px] font-medium text-[#98A2B3]"
                      onClick={pagination.onLast}
                      disabled={!pagination.hasNextPage && pagination.currentPage === totalPages}
                    >
                      Last
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Wallet Modal */}
      <Modal
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Add Wallet"
        className="max-w-[480px] w-full"
      >
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            if (!formState.name.trim()) {
              return
            }
            await createWallet({
              name: formState.name,
              currency: formState.currency,
              status: formState.status,
            })
            setIsAddOpen(false)
            setFormState({
              name: '',
              currency: 'USD',
              status: 'ACTIVE',
            })
          }}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">Wallet Name</label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
              className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
              placeholder="Enter wallet name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">Currency</label>
            <select
              value={formState.currency}
              onChange={(e) =>
                setFormState((s) => ({ ...s, currency: e.target.value as 'USD' | 'EUR' | 'GBP' }))
              }
              className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">Status</label>
            <select
              value={formState.status}
              onChange={(e) =>
                setFormState((s) => ({
                  ...s,
                  status: e.target.value as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED',
                }))
              }
              className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="rounded-[10px] border border-[#D0D5DD] px-4 py-2 text-sm font-medium text-[#344054]"
              onClick={() => {
                setIsAddOpen(false)
                setFormState({
                  name: '',
                  currency: 'USD',
                  status: 'ACTIVE',
                })
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-[10px] bg-[#007DC6] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

