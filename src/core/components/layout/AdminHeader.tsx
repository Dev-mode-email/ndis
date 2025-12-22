import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/core/components/ui/button'
import { useAuthStore } from '@/core/stores/authStore'
import { UserPlus } from 'lucide-react'
import { ROUTES } from '@/core/constants/routes'
import { ArrowLeftIcon } from '@/core/components/icons/ArrowLeftIcon'

export const AdminHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuthStore()

    const isDashboard = location.pathname.startsWith(ROUTES.DASHBOARD.HOME)
    const isUsers = location.pathname.startsWith(ROUTES.USERS.INDEX)
    const isWallets = location.pathname.startsWith(ROUTES.WALLETS.INDEX)
    const isTransactions = location.pathname.startsWith(ROUTES.TRANSACTIONS.INDEX)
    const isPayments = location.pathname.startsWith('/payments')
    const isMoodReports = location.pathname.startsWith(ROUTES.MOOD_REPORTS.INDEX)

    const getUserName = () => {
        if (user?.email) {
            const emailName = user.email.split('@')[0]
            return emailName.charAt(0).toUpperCase() + emailName.slice(1)
        }
        return 'User'
    }

    if (!isDashboard && !isUsers && !isWallets && !isTransactions && !isPayments && !isMoodReports) {
        return null
    }

    return (
        <header className="fixed top-0 left-[260px] right-0 z-50 bg-[#FFFFFF] border-b border-[#F2F4F7] px-8 py-8">
            {isDashboard && (
                <div className="flex items-center justify-between">
                    <h1 className="text-[36px] leading-[44px] tracking-[-0.02em] font-bold text-[#101828]">
                        <span className="mr-1">Welcome back,</span>
                        <span className="text-[#007DC6]">{getUserName()}</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            onClick={() => navigate(ROUTES.AUTH.REGISTER)}
                            className="inline-flex items-center gap-2 rounded-[10px] bg-[#007DC6] px-6 py-3 text-[16px] font-medium text-white shadow-[0_27px_80px_rgba(8,12,58,0.04),0_9.855px_29.201px_rgba(8,12,58,0.03),0_4.785px_14.177px_rgba(8,12,58,0.02),0_2.346px_6.95px_rgba(8,12,58,0.02),0_0.927px_2.748px_rgba(8,12,58,0.01)] hover:bg-[#00649E] transition-colors"
                        >
                            <UserPlus className="h-4 w-4" />
                            Onboard User
                        </Button>
                    </div>
                </div>
            )}

            {isUsers && (
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[36px] leading-[44px] tracking-[-0.02em] font-bold text-[#101828]">
                            Manage your users
                        </h1>
                        <p className="mt-1 max-w-xl text-[14px] leading-5 text-[#667085]">
                            Keep on top of your users access and activity
                        </p>
                    </div>
                </div>
            )}

            {isWallets && (
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[36px] leading-[44px] tracking-[-0.02em] font-bold text-[#101828]">
                            Manage Your Wallets
                        </h1>
                        <p className="mt-1 max-w-xl text-[14px] leading-5 text-[#667085]">
                            Control all of your wallets in one place
                        </p>
                    </div>
                </div>
            )}

            {isTransactions && (
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[36px] leading-[44px] tracking-[-0.02em] font-bold text-[#101828]">
                            View Your Transactions
                        </h1>
                        <p className="mt-1 max-w-xl text-[14px] leading-5 text-[#667085]">
                            View details of all the transactions on your wallets
                        </p>
                    </div>
                </div>
            )}

            {isPayments && location.pathname === ROUTES.PAYMENTS.NEW && (
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[36px] leading-[44px] tracking-[-0.02em] font-bold text-[#101828]">
                            New Payment
                        </h1>
                        <p className="mt-1 max-w-xl text-[14px] leading-5 text-[#667085]">
                            Lorem ipsum dolor sit amet consectetur
                        </p>
                    </div>
                </div>
            )}

            {isPayments && location.pathname === ROUTES.PAYMENTS.ADD_CASH && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(ROUTES.PAYMENTS.NEW)}
                            className="flex items-center justify-center w-10 h-10 rounded-[8px] border border-[#EAECF0] bg-white hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeftIcon className="h-6 w-6 text-[#344054]" />
                        </button>
                        <div>
                            <h1 className="text-[36px] leading-[44px] tracking-[-0.02em] font-bold text-[#101828]">
                                Add Pay Cash
                            </h1>
                            <p className="mt-1 max-w-xl text-[14px] leading-5 text-[#667085]">
                                Lorem ipsum dolor sit amet consectetur
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {isMoodReports && (
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[36px] leading-[44px] tracking-[-0.02em] font-bold text-[#101828]">
                            Mood Reports
                        </h1>
                        <p className="mt-1 max-w-xl text-[14px] leading-5 text-[#667085]">
                            Weekly, Monthly or Annual mood summary for the selected participant
                        </p>
                    </div>
                </div>
            )}
        </header>
    )
}
