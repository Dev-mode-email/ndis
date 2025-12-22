import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { UsersTable } from '@/modules/users/components/UsersTable'
import { useUsersPaginated } from '@/core/hooks/users/useUsers'
import { usePagination } from '@/core/hooks/data/usePagination'

export const UsersPage = () => {
  useDocumentTitle('Manage Users')
  const { currentPage, pageSize, updateCurrentPage } = usePagination(1, 15)
  const { data: usersResult, isLoading } = useUsersPaginated({
    page: currentPage,
    limit: pageSize,
  })

  const users = usersResult?.items ?? []
  const totalPages = usersResult?.meta.totalPages ?? (users.length > 0 ? currentPage + 1 : 1)
  const hasNextPage =
    usersResult?.meta.totalPages !== undefined
      ? currentPage < (usersResult.meta.totalPages ?? 1)
      : users.length === pageSize

  return (
    <div className="min-h-full bg-[#F9FAFB] px-8 py-8">
      <div className="mt-8">
        <UsersTable
          users={users}
          isLoading={isLoading}
          pagination={{
            currentPage,
            pageSize,
            totalItems: usersResult?.meta.totalItems,
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

