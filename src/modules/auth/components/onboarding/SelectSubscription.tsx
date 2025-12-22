import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/core/components/ui/button'

interface SelectSubscriptionProps {
  onBack: () => void
  onNext: (planId: string) => void
}

interface Plan {
  id: string
  name: string
  price: string
  subtitle: string
  features: string[]
}

const plans: Plan[] = [
  {
    id: 'professional',
    name: '1$ / Month',
    price: '1$ / Month',
    subtitle: 'Professional',
    features: [
      'Includes up to 10 licences',
      '$1 per month per additional licence',
      'VISA debit cards for cashless payments',
      'Budgeting and spending rules',
      'Automated spend reconciliation',
      'Quality & Safeguard compliant reporting',
      'Participant accounts to support capacity building',
      'Manage client funds, joint costs and business funds in one easy-to-use system',
      'Complimentary training and education resources',
    ],
  },
  {
    id: 'free',
    name: 'Free',
    price: 'Free',
    subtitle: 'for free',
    features: [
      'Set up an account for participants',
      'Track cash spend for a participant',
      'Store receipts and photos',
      'Provide statements to families',
      'Unlimited accounts for parents, admin or support workers',
      '12 participant accounts come standard; additional participants are $3.50 each',
    ],
  },
]

export const SelectSubscription = ({ onBack, onNext }: SelectSubscriptionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId)
    onNext(planId)
  }

  return (
    <div className="w-full max-w-[1040px]">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)]">
        <div className="px-6 py-8 flex flex-col gap-4">
          {/* Header */}
          <h1 className="font-gotham text-2xl font-normal text-[#101828] leading-[1.58]">
            Select a Subscription Plan
          </h1>

          {/* Spacer */}
          <div className="h-1 bg-[#F9FAFB] w-full" />

          {/* Plans wrapper: two separate cards with 16px gap */}
          <div className="w-full flex flex-col lg:flex-row gap-4">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className="flex-1 px-5 py-5 flex flex-col gap-6 bg-white border border-[#EAECF0] rounded-[10px]"
              >
                {/* Icon */}
                <div className="flex justify-start">
                  <div className="bg-[#E8F6FE] rounded-[4.89px] p-2.5">
                    {index === 0 ? (
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.2329 16.2327C19.7189 15.766 22.4075 12.7802 22.4075 9.16649C22.4075 5.22891 19.2154 2.03687 15.2778 2.03687C11.6641 2.03687 8.67835 4.72542 8.21164 8.2114M16.2964 15.2776C16.2964 19.2152 13.1043 22.4072 9.16674 22.4072C5.22916 22.4072 2.03711 19.2152 2.03711 15.2776C2.03711 11.34 5.22916 8.14798 9.16674 8.14798C13.1043 8.14798 16.2964 11.34 16.2964 15.2776Z"
                          stroke="#007DC6"
                          strokeWidth="1.83333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2408 5.09246C13.2408 6.21748 10.7328 7.12949 7.63896 7.12949C4.54514 7.12949 2.03711 6.21748 2.03711 5.09246M13.2408 5.09246C13.2408 3.96743 10.7328 3.05542 7.63896 3.05542C4.54514 3.05542 2.03711 3.96743 2.03711 5.09246M13.2408 5.09246V9.63215C11.9967 10.0058 11.2038 10.571 11.2038 11.2036M2.03711 5.09246V17.3147C2.03711 18.4397 4.54514 19.3517 7.63896 19.3517C8.99321 19.3517 10.2353 19.1769 11.2038 18.8862V11.2036M2.03711 9.16653C2.03711 10.2916 4.54514 11.2036 7.63896 11.2036C8.99321 11.2036 10.2353 11.0288 11.2038 10.738M2.03711 13.2406C2.03711 14.3657 4.54514 15.2776 7.63896 15.2776C8.99321 15.2776 10.2353 15.1029 11.2038 14.8121M22.4075 11.2036C22.4075 12.3286 19.8995 13.2406 16.8056 13.2406C13.7118 13.2406 11.2038 12.3286 11.2038 11.2036M22.4075 11.2036C22.4075 10.0785 19.8995 9.16653 16.8056 9.16653C13.7118 9.16653 11.2038 10.0785 11.2038 11.2036M22.4075 11.2036V19.3517C22.4075 20.4768 19.8995 21.3888 16.8056 21.3888C13.7118 21.3888 11.2038 20.4768 11.2038 19.3517V11.2036M22.4075 15.2776C22.4075 16.4027 19.8995 17.3147 16.8056 17.3147C13.7118 17.3147 11.2038 16.4027 11.2038 15.2776"
                          stroke="#007DC6"
                          strokeWidth="1.83333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Price and Subtitle */}
                <div className="flex flex-col gap-2.5">
                  <p className="font-gotham text-2xl font-[350] text-[#344054] leading-[1.33]">
                    {plan.price}
                  </p>
                  <p className="font-gotham text-lg font-[325] text-[#667085] leading-[1.56]">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => handleSelect(plan.id)}
                  className="w-full h-auto py-3 px-6 flex items-center justify-center gap-4 bg-[#007DC6] hover:bg-[#00649E] rounded-[6px]"
                >
                  <span className="font-gotham text-base font-[350] text-white leading-[1.5]">
                    Select
                  </span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </Button>

                {/* Features List */}
                <div className="flex flex-col gap-2">
                  <p className="font-gotham text-sm font-semibold text-[#101828] leading-[1.71]">
                    Includes:
                  </p>
                  <div className="bg-white border border-[#EAECF0] rounded-[10px] px-4 py-3 flex flex-col gap-3">
                    {plan.features.map((feature, indexFeature) => (
                      <div key={indexFeature}>
                        <div className="flex items-center justify-between gap-10">
                          <p className="font-gotham text-sm font-[350] text-[#344054] leading-[1.5] flex-1">
                            {feature}
                          </p>
                          <div className="w-[17px] h-[17px] shrink-0 flex items-center justify-center">
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.42708 2.125C3.81653 2.125 3.23099 2.36754 2.79926 2.79926C2.36754 3.23099 2.125 3.81653 2.125 4.42708V12.5729C2.125 13.1835 2.36754 13.769 2.79926 14.2007C3.23099 14.6325 3.81653 14.875 4.42708 14.875H12.5729C13.1835 14.875 13.769 14.6325 14.2007 14.2007C14.6325 13.769 14.875 13.1835 14.875 12.5729V4.42708C14.875 3.81653 14.6325 3.23099 14.2007 2.79926C13.769 2.36754 13.1835 2.125 12.5729 2.125H4.42708ZM12.24 6.57333L7.45592 11.3525C7.35631 11.4519 7.22128 11.5078 7.0805 11.5078C6.93972 11.5078 6.80469 11.4519 6.70508 11.3525L4.76 9.40667C4.66616 9.30596 4.61507 9.17276 4.6175 9.03513C4.61993 8.8975 4.67568 8.76619 4.77302 8.66885C4.87035 8.57152 5.00167 8.51576 5.1393 8.51333C5.27693 8.51091 5.41013 8.56199 5.51083 8.65583L7.08121 10.2255L11.4892 5.82179C11.5386 5.77249 11.5972 5.7334 11.6617 5.70676C11.7262 5.68011 11.7953 5.66643 11.8651 5.6665C11.9349 5.66656 12.004 5.68037 12.0684 5.70714C12.1329 5.73391 12.1914 5.77311 12.2407 5.8225C12.29 5.87189 12.3291 5.93051 12.3557 5.99501C12.3824 6.05951 12.3961 6.12863 12.396 6.19842C12.3959 6.2682 12.3821 6.3373 12.3554 6.40174C12.3286 6.46619 12.2894 6.52474 12.24 6.57404"
                                fill="#027A48"
                              />
                            </svg>
                          </div>
                        </div>
                        {indexFeature < plan.features.length - 1 && (
                          <div className="h-px bg-[#EAECF0] mt-3" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

