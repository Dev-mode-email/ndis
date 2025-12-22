import { useState } from 'react'
import { ArrowRight, Calendar, Smile } from 'lucide-react'
import { Modal } from '@/core/components/ui/modals/Modal'
import { DataTable, type DataTableColumn } from '@/core/components/ui/data-table'
import type { User } from '@/core/types/user'
import { useCreateUser, useSearchUserByEmail, useConnectUser } from '@/core/hooks/users/useUsers'
import { toastManager } from '@/core/components/ui/toast/toast'
import settingIcon from '@/assets/icons/setting.svg'
import profileSearchIcon from '@/assets/icons/profile-search.svg'
import cloudConnectionIcon from '@/assets/icons/cloud-connection.svg'
import profileAddIcon from '@/assets/icons/profile-add.svg'

type UserRole = 'Government Organisation'

interface UserRow {
  id: string
  displayId: string
  createdAt: string
  createdTime: string
  name: string
  email: string
  role: UserRole
  avatarInitials?: string
}

interface UsersTableProps {
  users: User[]
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

const formatDate = (value?: string) => {
  if (!value) return { date: '-', time: '' }
  const date = new Date(value)
  return {
    date: date.toLocaleDateString('en-AU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  }
}

const mapUsersToRows = (users: User[]): UserRow[] =>
  users.map((u) => {
    const { date, time } = formatDate(u.createdAt)
    const baseName =
      u.firstName || u.lastName
        ? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim()
        : u.organizationName || u.email.split('@')[0]

    const initials =
      (u.firstName && u.lastName && `${u.firstName[0]}${u.lastName[0]}`.toUpperCase()) ||
      baseName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0])
        .join('')
        .toUpperCase()

    return {
      id: u.id,
      displayId: u.displayId ?? u.id.slice(0, 11).toUpperCase(),
      createdAt: date,
      createdTime: time,
      name: baseName,
      email: u.email,
      role: (u.role as UserRole) || 'Government Organisation',
      avatarInitials: initials,
    }
  })

export const UsersTable = ({ users, isLoading, pagination }: UsersTableProps) => {
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isConnectOpen, setIsConnectOpen] = useState(false)
  const [formState, setFormState] = useState({
    userType: 'ORGANIZATION' as 'INDIVIDUAL' | 'ORGANIZATION',
    firstName: '',
    lastName: '',
    organizationName: '',
    email: '',
  })
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser()
  const { mutateAsync: searchUserByEmail, isPending: isSearching } = useSearchUserByEmail()
  const { mutateAsync: connectUser, isPending: isConnecting } = useConnectUser()
  const isIndividual = formState.userType === 'INDIVIDUAL'

  const resetForm = () =>
    setFormState({
      userType: 'ORGANIZATION',
      firstName: '',
      lastName: '',
      organizationName: '',
      email: '',
    })

  const rows = mapUsersToRows(users)

  const columns: DataTableColumn<UserRow>[] = [
    {
      key: 'id',
      header: 'ID',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[210px]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[210px]',
      render: (user) => user.id,
    },
    {
      key: 'displayId',
      header: 'Display ID',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[160px]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[160px]',
      render: (user) => user.displayId,
    },
    {
      key: 'createdAt',
      header: 'Created at',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[140px]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[140px]',
      render: (user) => (
        <div>
          <div>{user.createdAt}</div>
          <div className="text-sm">{user.createdTime}</div>
        </div>
      ),
    },
    {
      key: 'member',
      header: 'Member',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0]',
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAECF0] border border-[#D0D5DD] text-[14px] font-medium text-black">
            {user.avatarInitials ?? 'JB'}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="truncate text-[14px] text-[#344054]">{user.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      headerClassName:
        'px-3 py-3 border-r border-[#EAECF0] text-[16px] font-medium text-[#344054] w-[140px]',
      cellClassName: 'px-3 py-4 border-r border-[#EAECF0] w-[140px]',
      render: (user) => (
        <span className="font-bold text-[#007DC6]">{user.role}</span>
      ),
    },
    {
      key: 'mood',
      header: 'Mood',
      headerClassName:
        'px-3 py-3 text-[16px] font-medium text-[#344054] w-[100px]',
      cellClassName: 'px-3 py-4 w-[100px]',
      render: (user) => (
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="border-b border-[#007DC6] text-[16px] font-medium text-[#007DC6]"
            onClick={() => setSelectedUser(user)}
          >
            Weekly
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="rounded-[10px] bg-white shadow-[0_27px_80px_rgba(8,12,58,0.04),0_9.855px_29.201px_rgba(8,12,58,0.03),0_4.785px_14.177px_rgba(8,12,58,0.02),0_2.346px_6.95px_rgba(8,12,58,0.02),0_0.927px_2.748px_rgba(8,12,58,0.01)] border border-[#EAECF0]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div>
          <h2 className="text-[24px] leading-8 font-medium text-[#242A32]">Users list</h2>
          <p className="mt-1 text-[14px] leading-5 text-[#667085]">
            See information about all of your connected users
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              resetForm()
              setIsConnectOpen(true)
            }}
            className="inline-flex items-center gap-3 rounded-[10px] bg-[#E8F6FE] px-6 py-3 text-[16px] font-medium text-[#007DC6]"
          >
            Connect User
            <img src={cloudConnectionIcon} alt="" className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => {
              resetForm()
              setIsAddOpen(true)
            }}
          className="inline-flex items-center gap-3 rounded-[10px] bg-[#007DC6] px-6 py-3 text-[16px] font-medium text-white"
          >
            Add User
          <img src={profileAddIcon} alt="" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 px-5 pb-4">
        <button
          type="button"
          className="inline-flex items-center justify-between gap-3 rounded-[10px] border border-[#F2F4F7] bg-white px-4 py-3 text-[16px] text-[#98A2B3] min-w-[260px]"
        >
          <span>Government Organisation</span>
          <span className="text-xs">▾</span>
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 rounded-[10px] border border-[#F2F4F7] bg-white px-4 py-3 text-[16px] text-[#98A2B3]">
            <img src={profileSearchIcon} alt="" className="h-6 w-6" />
            <span className="flex-1">
              Search User (Full Name, Email, ID)
            </span>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-[16px] font-medium text-[#007DC6]"
        >
          Settings
          <img src={settingIcon} alt="" className="h-6 w-6" />
        </button>
      </div>

      {/* Table */}
      <div className="border-t border-[#EAECF0]">
        <DataTable
          columns={columns}
          data={rows}
          isLoading={isLoading}
          loadingContent={
            <div className="flex items-center justify-center py-10 text-sm text-[#667085]">
              Loading users...
            </div>
          }
          emptyContent={
            <div className="flex items-center justify-center py-10 text-sm text-[#667085]">
              No users found
            </div>
          }
          className="w-full"
        />

        {pagination && (
          <div className="flex items-center justify-between gap-8 bg-gray-50 px-4 py-2 rounded-b-[10px] border-t border-[#F2F4F7] text-[14px] text-[#0A1420]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-[6px] border border-[#F3F3F3] px-2 py-1 text-[14px]">
                  {pagination.pageSize}
                </div>
                <span>Users per page</span>
              </div>
              <div className="h-4 w-px bg-[#EAECF0]" />
              <span className="font-bold tracking-[-0.02em]">
                {(pagination.totalItems ?? users.length)} users
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
                Page {pagination.currentPage} of {pagination.totalPages ?? pagination.currentPage}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-[5px] border border-[#F1F1F1] bg-white disabled:opacity-50"
                  onClick={pagination.onNext}
                  disabled={!pagination.hasNextPage}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="rounded-[10px] bg-white px-6 py-2 text-[16px] font-medium text-[#98A2B3]"
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

      {/* Weekly Mood Summary Modal */}
      <Modal open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)} className="max-w-[600px] w-full p-0 border-none bg-transparent shadow-none">
        {selectedUser && (
          <div className="relative mx-auto w-full rounded-[16px] bg-white shadow-[0_27px_80px_rgba(8,12,58,0.04),0_9.855px_29.201px_rgba(8,12,58,0.03),0_4.785px_14.177px_rgba(8,12,58,0.02),0_2.346px_6.95px_rgba(8,12,58,0.02),0_0.927px_2.748px_rgba(8,12,58,0.01)]">
            {/* Top emoji badge */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FCFCFD] p-3 shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F6FE]">
                <Smile className="h-8 w-8 text-[#007DC6]" />
              </div>
            </div>

            {/* Header */}
            <div className="flex flex-col items-center gap-2 rounded-t-[16px] bg-[#FCFCFD] px-5 pb-6 pt-10">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAECF0] border border-[#D0D5DD] text-[14px] font-medium text-black">
                  {selectedUser.avatarInitials ?? 'JB'}
                </div>
                <p className="text-[24px] leading-8 font-bold text-[#242A32]">
                  {selectedUser.name}
                </p>
              </div>
              <p className="text-[14px] leading-5 text-[#344054]">Weekly Mood Summary</p>
            </div>

            <div className="space-y-8 px-5 pb-6 pt-6">
              {/* Date range input */}
              <div className="rounded-[10px] border border-[#F2F4F7] bg-white px-4 py-3 flex items-center justify-between">
                <span className="text-[16px] leading-6 text-[#475467]">
                  28/08/2025 - 05/10/2025
                </span>
                <Calendar className="h-5 w-5 text-[#98A2B3]" />
              </div>

              {/* Graph placeholder */}
              <div className="h-[260px] rounded-[10px] border border-[#EAECF0] bg-gradient-to-b from-[#F5F8FF] to-white flex items-end justify-center px-4 py-4">
                {/* Static graph line placeholder styled according to Figma */}
                <div className="h-full w-full max-w-[460px] border-l border-b border-[#E5E7EB] relative">
                  <div className="absolute left-0 right-0 bottom-0 flex justify-between px-2 text-[12px] text-[#949494]">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-8 flex justify-center">
                    <svg viewBox="0 0 100 40" className="h-24 w-full text-[#007DC6]">
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        points="0,35 15,35 30,30 45,10 60,35 75,8 90,10 100,10"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mood summary cards */}
              <div className="flex gap-3">
                <div className="flex-1 rounded-[10px] border border-[#F2F4F7] px-4 py-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F6FE]">
                    <span role="img" aria-label="happy">
                      🙂
                    </span>
                  </div>
                  <div>
                    <p className="text-[16px] leading-6 font-medium text-[#475467]">Happy</p>
                    <p className="text-[12px] leading-[18px] text-[#007DC6]">40% - 3 days</p>
                  </div>
                </div>
                <div className="flex-1 rounded-[10px] border border-[#F2F4F7] px-4 py-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F6FE]">
                    <span role="img" aria-label="mixed">
                      😐
                    </span>
                  </div>
                  <div>
                    <p className="text-[16px] leading-6 font-medium text-[#475467]">Mixed</p>
                    <p className="text-[12px] leading-[18px] text-[#007DC6]">20% - 1 day</p>
                  </div>
                </div>
                <div className="flex-1 rounded-[10px] border border-[#F2F4F7] px-4 py-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F6FE]">
                    <span role="img" aria-label="stressed">
                      😟
                    </span>
                  </div>
                  <div>
                    <p className="text-[16px] leading-6 font-medium text-[#475467]">Stressed</p>
                    <p className="text-[12px] leading-[18px] text-[#007DC6]">40% - 3 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add User Modal */}
      <Modal
        open={isAddOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddOpen(false)
            resetForm()
          }
        }}
        title="Add User"
        className="max-w-[480px] w-full"
      >
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            const email = formState.email.trim()
            if (!email) {
              toastManager.error('Please provide email')
              return
            }

            if (isIndividual && (!formState.firstName.trim() || !formState.lastName.trim())) {
              toastManager.error('First name and last name are required for Individual')
              return
            }

            if (!isIndividual && !formState.organizationName.trim()) {
              toastManager.error('Organization name is required')
              return
            }

            await createUser({
              userType: formState.userType,
              firstName: formState.firstName.trim() || undefined,
              lastName: formState.lastName.trim() || undefined,
              organizationName: formState.organizationName.trim() || undefined,
              email,
              password: 'password',
              role: 'ADMIN',
              status: 'ACTIVE',
            })
            resetForm()
            setIsAddOpen(false)
          }}
        >
          <p className="text-sm text-[#667085]">
            Add User creates a <span className="font-semibold">brand-new profile</span>{' '}
            for a participant, support worker or guardian who doesn&apos;t yet exist in your
            organisation.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className={`rounded-[10px] border px-3 py-2 text-sm font-medium ${
                isIndividual
                  ? 'border-[#007DC6] text-[#007DC6]'
                  : 'border-[#D0D5DD] text-[#344054]'
              }`}
              onClick={() => setFormState((s) => ({ ...s, userType: 'INDIVIDUAL' }))}
            >
              Individual
            </button>
            <button
              type="button"
              className={`rounded-[10px] border px-3 py-2 text-sm font-medium ${
                !isIndividual
                  ? 'border-[#007DC6] text-[#007DC6]'
                  : 'border-[#D0D5DD] text-[#344054]'
              }`}
              onClick={() => setFormState((s) => ({ ...s, userType: 'ORGANIZATION' }))}
            >
              Organization
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">Email</label>
            <input
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
              className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
              placeholder="user@example.com"
            />
          </div>
          {isIndividual ? (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#344054]">First name</label>
                <input
                  type="text"
                  required
                  value={formState.firstName}
                  onChange={(e) => setFormState((s) => ({ ...s, firstName: e.target.value }))}
                  className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#344054]">Last name</label>
                <input
                  type="text"
                  required
                  value={formState.lastName}
                  onChange={(e) => setFormState((s) => ({ ...s, lastName: e.target.value }))}
                  className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
                  placeholder="Last name"
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#344054]">Organisation name</label>
              <input
                type="text"
                required
                value={formState.organizationName}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, organizationName: e.target.value }))
                }
                className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
                placeholder="Organisation name"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="rounded-[10px] border border-[#D0D5DD] px-4 py-2 text-sm font-medium text-[#344054]"
              onClick={() => {
                setIsAddOpen(false)
                resetForm()
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="rounded-[10px] bg-[#007DC6] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {isCreating ? 'Saving...' : 'Create User'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Connect User Modal */}
      <Modal
        open={isConnectOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsConnectOpen(false)
            resetForm()
          }
        }}
        title="Connect User"
        className="max-w-[480px] w-full"
      >
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            const email = formState.email.trim()
            if (!email) {
              toastManager.error('Please provide email')
              return
            }

            try {
              const foundUser = await searchUserByEmail(email)

              if (!foundUser) {
                toastManager.error(
                  'User not found. If they already have an account from another provider, please check the email address. Otherwise, use Add User to create a new profile.'
                )
                return
              }

              const alreadyConnected = users.some(
                (u) => u.id === foundUser.id
              )

              if (alreadyConnected) {
                toastManager.info('This user is already connected to your organisation')
                setIsConnectOpen(false)
                resetForm()
                return
              }

              await connectUser(foundUser.id)
              toastManager.success(
                `User ${foundUser.email} has been connected to your organisation`
              )
              setIsConnectOpen(false)
              resetForm()
            } catch (error) {
              toastManager.error('Failed to connect user. Please try again.')
            }
          }}
        >
          <p className="text-sm text-[#667085]">
            Connect User lets you{' '}
            <span className="font-semibold">link an existing user</span> to this
            organisation without creating a duplicate profile. This is useful when a user already
            has an account from a previous provider.
          </p>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#344054]">
              User email
            </label>
            <input
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
              className="w-full rounded-[10px] border border-[#D0D5DD] px-3 py-2 text-sm outline-none focus:border-[#007DC6]"
              placeholder="existing.user@example.com"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="rounded-[10px] border border-[#D0D5DD] px-4 py-2 text-sm font-medium text-[#344054]"
              onClick={() => {
                setIsConnectOpen(false)
                resetForm()
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSearching || isConnecting}
              className="rounded-[10px] bg-[#007DC6] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {isSearching || isConnecting ? 'Connecting...' : 'Connect User'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}


