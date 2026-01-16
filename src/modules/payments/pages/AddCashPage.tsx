import { useState } from 'react'
import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/core/constants/routes'
import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/inputs/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/inputs/select'
import { useUsers } from '@/core/hooks/users/useUsers'
import { useWallets } from '@/core/hooks/wallets/useWallets'
import { ArrowLeftIcon } from '@/core/components/icons/ArrowLeftIcon'
import { CardAddIcon } from '@/core/components/icons/CardAddIcon'

export const AddCashPage = () => {
  useDocumentTitle('Add Pay Cash')
  const navigate = useNavigate()
  const { data: users = [] } = useUsers()
  const { data: wallets = [] } = useWallets()

  const [formData, setFormData] = useState({
    userId: '',
    walletId: '',
    storeName: '',
    amount: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
  }

  return (
    <div className="min-h-full bg-[#F9FAFB] px-8 py-8 flex items-center justify-center">
      <div className="w-full max-w-[600px]">
        <div className="bg-white rounded-[16px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] relative">
          {/* Icon at top */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-[42px] bg-[#FCFCFD] rounded-full p-[14px]">
            <div className="w-[56px] h-[56px] flex items-center justify-center">
              <CardAddIcon className="h-full w-full text-[#004B77]" />
            </div>
          </div>

          {/* Header */}
          <div className="bg-[#FCFCFD] rounded-t-[16px] pt-[56px] pb-6 px-5 flex flex-col items-center gap-2">
            <h2 className="text-[24px] leading-[32px] font-bold text-[#242A32]">
              Pay Cash
            </h2>
            <p className="text-[14px] leading-[20px] text-[#344054] text-center max-w-[443px]">
              Lorem ipsum dolor sit amet consectetur. Tellus nam etiam quisque ipsum vitae lectus erat sapien.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-8 border-2 border-red-500 bg-red-50 rounded-lg">
            <div className="flex flex-col gap-5">
              {/* User Select */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-[#101828] leading-[24px]">
                  User
                </label>
                <Select
                  value={formData.userId}
                  onValueChange={(value) => setFormData({ ...formData, userId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user.organizationName || user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Wallet Select */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-[#101828] leading-[24px]">
                  Wallet
                </label>
                <Select
                  value={formData.walletId}
                  onValueChange={(value) => setFormData({ ...formData, walletId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        {wallet.name} {wallet.balance !== undefined ? `($${wallet.balance.toLocaleString()})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Store Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-[#101828] leading-[24px]">
                  Name of the Store
                </label>
                <Input
                  type="text"
                  placeholder="Name of the Store"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                />
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-[#101828] leading-[24px]">
                  Amount
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter Cash Amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-[#EAECF0] w-full my-2" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(ROUTES.PAYMENTS.NEW)}
                className="flex-1 bg-white border border-[#F2F4F7] text-[#98A2B3] hover:bg-gray-50 flex items-center justify-center gap-4"
              >
                <ArrowLeftIcon className="h-6 w-6" />
                <span className="text-[16px] font-medium">Back</span>
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#007DC6] hover:bg-[#00649E] text-white"
              >
                <span className="text-[16px] font-medium">Confirm Pay Cash</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
