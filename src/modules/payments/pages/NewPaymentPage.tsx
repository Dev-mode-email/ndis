import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/core/constants/routes'
import { Button } from '@/core/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { CardAddIcon } from '@/core/components/icons/CardAddIcon'

export const NewPaymentPage = () => {
  useDocumentTitle('New Payment')
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#F9FAFB] px-8 py-8">
      <div className="mt-8">
        <div className="bg-white rounded-[16px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] p-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-6 flex-1">
              <div className="border border-[#EAECF0] rounded-[4px] p-[10px] flex items-center justify-center">
                <CardAddIcon className="h-[34px] w-[34px] text-[#004B77]" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[32px] leading-[44px] tracking-[-0.64px] font-bold text-[#004B77]">
                  Pay Cash Transaction
                </h2>
              </div>
            </div>
            <Button
              onClick={() => navigate(ROUTES.PAYMENTS.ADD_CASH)}
              className="inline-flex items-center gap-4 bg-[#007DC6] hover:bg-[#00649E] px-6 py-3 rounded-[10px] text-white font-medium text-base"
            >
              <span>Add Pay Cash</span>
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
      </div>
      </div>
    </div>
  )
}
