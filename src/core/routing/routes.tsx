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

// Get base URL from Vite's BASE_URL (automatically set from vite.config.js base option)
// Vite sets BASE_URL from the 'base' config option
const baseUrl = import.meta.env.BASE_URL || '/'

// Remove trailing slash for basename (createBrowserRouter expects it without trailing slash)
// If baseUrl is '/', basename should be undefined (no base path)
// Otherwise, remove trailing slash if present
const basename = baseUrl === '/' ? undefined : (baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl)

// Debug logging
console.log('[Router] BASE_URL:', baseUrl, 'basename:', basename, 'current path:', window.location.pathname)

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
