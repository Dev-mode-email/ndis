export interface Wallet {
  id: string
  name: string
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  currency: 'USD' | 'EUR' | 'GBP'
  balance?: number
  displayId?: string
  createdAt?: string
  updatedAt?: string
}

