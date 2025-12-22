import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from "@/core/components/layout/AdminLayout"
import { ProtectedRoute } from "@/core/routing/ProtectedRoute"
import { OnboardingGuard } from "@/core/routing/OnboardingGuard"
import { DashboardGuard } from "@/core/routing/DashboardGuard"
import { ROUTES } from "@/core/constants/routes"

// Auth pages
import { LoginPage } from "@/modules/auth/pages/LoginPage"
import { RegisterPage } from "@/modules/auth/pages/RegisterPage"
import { OnboardingPage } from "@/modules/auth/pages/OnboardingPage"

// Common pages
import { NotFoundPage } from "@/modules/common/pages/NotFoundPage"

// Admin pages
import { DashboardPage } from "@/modules/dashboard/pages/DashboardPage"
import { UsersPage } from "@/modules/users/pages/UsersPage"
import { WalletsPage } from "@/modules/wallets/pages/WalletsPage"
import { TransactionsPage } from "@/modules/transactions/pages/TransactionsPage"
import { NewPaymentPage } from "@/modules/payments/pages/NewPaymentPage"
import { AddCashPage } from "@/modules/payments/pages/AddCashPage"
import { MoodReportsPage } from "@/modules/mood-reports/pages/MoodReportsPage"
import { AccountPage } from "@/modules/account/pages/AccountPage"

// Placeholder components for detail pages
const UserDetailsPage = () => <div className="p-6">User Details</div>
const WalletDetailsPage = () => <div className="p-6">Wallet Details</div>
const TransactionDetailsPage = () => <div className="p-6">Transaction Details</div>
const ForgotPasswordPage = () => <div className="p-6">Forgot Password</div>
const ResetPasswordPage = () => <div className="p-6">Reset Password</div>

// Remove trailing slash for basename (createBrowserRouter expects it without trailing slash)
const baseUrl = import.meta.env.BASE_URL || '/'
const basename = baseUrl === '/' ? undefined : (baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl)

// Debug: log basename to console
if (import.meta.env.DEV) {
    console.log('Router basename:', basename, 'BASE_URL:', baseUrl)
}

export const router = createBrowserRouter([
    {
        path: '/',
        basename: basename,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
            },
            // Auth routes (public)
            {
                path: 'auth',
                children: [
                    {
                        path: 'login',
                        element: <LoginPage />,
                    },
                    {
                        path: 'register',
                        element: <RegisterPage />,
                    },
                    {
                        path: 'forgot-password',
                        element: <ForgotPasswordPage />,
                    },
                    {
                        path: 'reset-password',
                        element: <ResetPasswordPage />,
                    },
                ],
            },
            // Onboarding route (protected, but without AdminLayout)
            {
                element: (
                    <ProtectedRoute>
                        <OnboardingGuard>
                            <OnboardingPage />
                        </OnboardingGuard>
                    </ProtectedRoute>
                ),
                path: 'onboarding',
            },
            // Protected routes - AdminLayout
            {
                element: <AdminLayout />,
                children: [
                    {
                        element: <ProtectedRoute />,
                        children: [
                            // Dashboard
                            {
                                path: 'dashboard',
                                element: (
                                    <DashboardGuard>
                                        <DashboardPage />
                                    </DashboardGuard>
                                ),
                            },
                            // Users
                            {
                                path: 'users',
                                children: [
                                    {
                                        index: true,
                                        element: <UsersPage />,
                                    },
                                    {
                                        path: ':id',
                                        element: <UserDetailsPage />,
                                    },
                                ],
                            },
                            // Wallets
                            {
                                path: 'wallets',
                                children: [
                                    {
                                        index: true,
                                        element: <WalletsPage />,
                                    },
                                    {
                                        path: ':id',
                                        element: <WalletDetailsPage />,
                                    },
                                ],
                            },
                            // Transactions
                            {
                                path: 'transactions',
                                children: [
                                    {
                                        index: true,
                                        element: <TransactionsPage />,
                                    },
                                    {
                                        path: ':id',
                                        element: <TransactionDetailsPage />,
                                    },
                                ],
                            },
                            // Payments
                            {
                                path: 'payments',
                                children: [
                                    {
                                        path: 'new',
                                        element: <NewPaymentPage />,
                                    },
                                    {
                                        path: 'add-cash',
                                        element: <AddCashPage />,
                                    },
                                ],
                            },
                            // Mood Reports
                            {
                                path: 'mood-reports',
                                element: <MoodReportsPage />,
                            },
                            // Account
                            {
                                path: 'account',
                                element: <AccountPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
])
