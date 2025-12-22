export interface Transaction {
  id: string
  type: 'INCOME' | 'EXPENSE'
  amount: number
  walletId: string
  userId: string
  description?: string
  categoryId?: string
  ppan?: string
  transactionPartner?: string
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'FAILED'
  createdAt?: string
  updatedAt?: string
}

export interface UseTransactionsParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
  walletId?: string
  userId?: string
}

