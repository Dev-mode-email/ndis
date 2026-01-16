import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from "@/core/components/layout/AdminLayout"
import { ProtectedRoute } from "@/core/routing/ProtectedRoute"
import { OnboardingGuard } from "@/core/routing/OnboardingGuard"
import { DashboardGuard } from "@/core/routing/DashboardGuard"
import { ROUTES } from "@/core/constants/routes"

import { LoginPage } from "@/modules/auth/pages/LoginPage"
import { RegisterPage } from "@/modules/auth/pages/RegisterPage"
import { OnboardingPage } from "@/modules/auth/pages/OnboardingPage"

import { NotFoundPage } from "@/modules/common/pages/NotFoundPage"

import { DashboardPage } from "@/modules/dashboard/pages/DashboardPage"
import { UsersPage } from "@/modules/users/pages/UsersPage"
import { WalletsPage } from "@/modules/wallets/pages/WalletsPage"
import { TransactionsPage } from "@/modules/transactions/pages/TransactionsPage"
import { NewPaymentPage } from "@/modules/payments/pages/NewPaymentPage"
import { AddCashPage } from "@/modules/payments/pages/AddCashPage"
import { MoodReportsPage } from "@/modules/mood-reports/pages/MoodReportsPage"
import { AccountPage } from "@/modules/account/pages/AccountPage"

const UserDetailsPage = () => <div className="p-6">User Details</div>
const WalletDetailsPage = () => <div className="p-6">Wallet Details</div>
const TransactionDetailsPage = () => <div className="p-6">Transaction Details</div>
const ForgotPasswordPage = () => <div className="p-6">Forgot Password</div>
const ResetPasswordPage = () => <div className="p-6">Reset Password</div>

const baseUrl = import.meta.env.BASE_URL || '/'

let basename: string | undefined = baseUrl === '/' ? undefined : (baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl)

console.log('[Router] BASE_URL:', baseUrl, 'basename:', basename, 'current path:', window.location.pathname)
export const router = createBrowserRouter(
    [
        {
            path: '/',
            errorElement: <NotFoundPage />,
            children: [
                {
                    index: true,
                    element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
                },
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
                {
                    element: <AdminLayout />,
                    children: [
                        {
                            element: <ProtectedRoute />,
                            children: [
                                {
                                    path: 'dashboard',
                                    element: (
                                        <DashboardGuard>
                                            <DashboardPage />
                                        </DashboardGuard>
                                    ),
                                },
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
                                {
                                    path: 'mood-reports',
                                    element: <MoodReportsPage />,
                                },
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
    ],
    {
        basename: basename,
    }
)
