import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { WalletsTable, type WalletRow } from '@/modules/wallets/components/WalletsTable'
import { useWalletsPaginated } from '@/core/hooks/wallets/useWallets'
import { usePagination } from '@/core/hooks/data/usePagination'
import type { Wallet } from '@/core/types/wallet'

const mapWalletsToRows = (wallets: Wallet[]): WalletRow[] =>
  wallets.map((w) => ({
    id: w.id,
    displayId: w.displayId ?? w.id.slice(0, 11).toUpperCase(),
    walletName: w.name,
    description: 'A simple cash wallet for spending money',
    memberName: '-',
    memberEmail: '-',
    balance: `$${(w.balance ?? 0).toLocaleString()}`,
  }))

export const WalletsPage = () => {
  useDocumentTitle('Manage Wallets')

  const { currentPage, pageSize, updateCurrentPage } = usePagination(1, 15)

  const { data: walletsResult, isLoading } = useWalletsPaginated({
    page: currentPage,
    limit: pageSize,
  })

  const walletsData = walletsResult?.items ?? []
  const wallets: WalletRow[] = mapWalletsToRows(walletsData)

  const totalPages = walletsResult?.meta.totalPages ?? (wallets.length > 0 ? currentPage + 1 : 1)
  const hasNextPage =
    walletsResult?.meta.totalPages !== undefined
      ? currentPage < (walletsResult.meta.totalPages ?? 1)
      : wallets.length === pageSize

  return (
    <div className="min-h-full bg-[#F9FAFB] px-8 py-8">
      <div className="mt-8">
        <WalletsTable
          wallets={wallets}
          isLoading={isLoading}
          pagination={{
            currentPage,
            pageSize,
            totalItems: walletsResult?.meta.totalItems,
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

