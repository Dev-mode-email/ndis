import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'

export const AccountPage = () => {
  useDocumentTitle('Account Settings')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account preferences
        </p>
      </div>

      {/* Account settings will be here */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500">Account settings coming soon...</p>
      </div>
    </div>
  )
}

