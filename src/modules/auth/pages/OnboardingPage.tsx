import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { useAuthStore } from '@/core/stores/authStore'
import { ROUTES } from '@/core/constants/routes'
import { UserTypeSelection, UserType } from '../components/onboarding/UserTypeSelection'
import { NDISDetailsForm, NDISDetailsFormValues } from '../components/forms/NDISDetailsForm'
import { ProviderDetailsForm, ProviderDetailsFormValues } from '../components/forms/ProviderDetailsForm'
import type { ParticipantFormValues } from '../components/onboarding/AddParticipant'
import { OrganisationDetailsPlaceholder } from '../components/layout/OrganisationDetailsPlaceholder'
import { GeneralCompanyInfoForm, GeneralCompanyInfoFormValues } from '../components/forms/GeneralCompanyInfoForm'
import { ProgressSidebar } from '../components/layout/ProgressSidebar'
import { SelectSubscription } from '../components/onboarding/SelectSubscription'
import { GeneralCompanyInfoSuccess } from '../components/onboarding/GeneralCompanyInfoSuccess'
import { SubscriptionSuccess } from '../components/onboarding/SubscriptionSuccess'
import { ParticipantSuccess } from '../components/onboarding/ParticipantSuccess'
import { AddParticipant } from '../components/onboarding/AddParticipant'
import { AddWallet } from '../components/onboarding/AddWallet'
import { OrderCard } from '../components/onboarding/OrderCard'
import { OnboardingComplete } from '../components/onboarding/OnboardingComplete'
import { userApi, type OnboardingStatus } from '@/core/api/user'
import { useCreateUser } from '@/core/hooks/users/useUsers'
import { useCreateWallet } from '@/core/hooks/wallets/useWallets'
import { useCreateSubscription } from '@/core/hooks/subscription/useSubscription'
import { useOrderCard } from '@/core/hooks/card/useCard'

type OnboardingStep = 1 | 2 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 7 | 8

const stepToOnboardingStatus = (step: OnboardingStep, _userType: UserType | null): OnboardingStatus | null => {
  switch (step) {
    case 1:
      return 'INITIAL'
    case 2:
      return 'NDIS_PROVIDER_DETAILS'
    case 3:
    case 3.5:
      return 'COMPANY_INFO'
    case 4:
    case 4.5:
      return 'SUBSCRIPTION'
    case 5:
    case 5.5:
      return 'ADD_PARTICIPANT'
    case 6:
    case 7:
      return 'ADD_WALLET'
    case 8:
      return 'ORDER_CARD'
    default:
      return null
  }
}

const onboardingStatusToStep = (status: OnboardingStatus | undefined): OnboardingStep => {
  switch (status) {
    case 'INITIAL':
      return 1
    case 'NDIS_PROVIDER_DETAILS':
      return 2
    case 'COMPANY_INFO':
      return 3
    case 'SUBSCRIPTION':
      return 4
    case 'ADD_PARTICIPANT':
      return 5
    case 'ADD_WALLET':
      return 6
    case 'ORDER_CARD':
      return 7
    case 'COMPLETED':
      return 8
    default:
      return 1
  }
}

const SUBSCRIPTION_PLANS = [
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
] as const

export const OnboardingPage = () => {
  useDocumentTitle('Onboarding')
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuthStore()
  const createUserMutation = useCreateUser()
  const createWalletMutation = useCreateWallet()
  const createSubscriptionMutation = useCreateSubscription()
  const orderCardMutation = useOrderCard()

  const stepFromUrlParam = searchParams.get('step') || '1'
  const stepFromUrl = (stepFromUrlParam.includes('.') ? parseFloat(stepFromUrlParam) : parseInt(stepFromUrlParam, 10)) as OnboardingStep
  const [step, setStep] = useState<OnboardingStep>(stepFromUrl)
  const planFromUrlParam = searchParams.get('plan')

  const [userType, setUserType] = useState<UserType | null>(null)
  const [ndisDetails, setNdisDetails] = useState<NDISDetailsFormValues | null>(null)
  const [providerDetails, setProviderDetails] = useState<ProviderDetailsFormValues | null>(null)
  const [companyInfo, setCompanyInfo] = useState<GeneralCompanyInfoFormValues | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string
    name: string
    price: string
    subtitle: string
    features: string[]
  } | null>(
    planFromUrlParam
      ? (() => {
          const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planFromUrlParam)
          if (!plan) return null
          return {
            id: plan.id,
            name: plan.name,
            price: plan.price,
            subtitle: plan.subtitle,
            features: [...plan.features],
          }
        })()
      : null,
  )

  const [participantData, setParticipantData] = useState<any>(() => {
    const firstNameFromUrl = searchParams.get('participantFirstName')
    const lastNameFromUrl = searchParams.get('participantLastName')
    const emailFromUrl = searchParams.get('participantEmail')
    const phoneFromUrl = searchParams.get('participantPhone') || undefined
    const dobFromUrl = searchParams.get('participantDob') || undefined
    const genderFromUrl = searchParams.get('participantGender') || undefined
    const ndisFromUrl = searchParams.get('participantNdis') || undefined
    const idFromUrl = searchParams.get('participantId') || undefined

    if (!firstNameFromUrl && !lastNameFromUrl && !emailFromUrl) {
      return null
    }

    return {
      id: idFromUrl,
      firstName: firstNameFromUrl || '',
      lastName: lastNameFromUrl || '',
      email: emailFromUrl || '',
      phoneNumber: phoneFromUrl,
      dateOfBirth: dobFromUrl,
      gender: genderFromUrl,
      ndisNumber: ndisFromUrl,
    }
  })

  const updateStep = async (newStep: OnboardingStep, extraParams?: Record<string, string>) => {
    setStep(newStep)
    setSearchParams({
      step: newStep.toString(),
      ...(extraParams || {}),
    })

    if (!isTempToken) {
      const userId = getUserId()
      if (userId) {
        const status = stepToOnboardingStatus(newStep, userType)
        if (status) {
          try {
            await userApi.updateOnboardingStatus({ onboardingStatus: status })
          } catch (error) {
            console.error('Failed to update onboarding status:', error)
          }
        }
      }
    }
  }
  const [walletId, setWalletId] = useState<string | null>(null)

  const getUserId = (): string | null => {
    if (!user?.userId) return null
    return typeof user.userId === 'string' ? user.userId : String(user.userId)
  }

  const isTempToken = user?.access_token === 'temp_token'

  useEffect(() => {
    const loadOnboardingStatus = async () => {
      if (!isTempToken && user?.userId) {
        const userId = getUserId()
        if (userId) {
          try {
            const response = await userApi.getById(userId)
            const currentStatus = response.data?.onboardingStatus as OnboardingStatus | undefined
            if (currentStatus && currentStatus !== 'COMPLETED') {
              const stepFromStatus = onboardingStatusToStep(currentStatus)
              if (stepFromStatus !== step) {
                setStep(stepFromStatus)
                setSearchParams({ step: stepFromStatus.toString() })
              }
            }
          } catch (error) {
            console.error('Failed to load onboarding status:', error)
          }
        }
      }
    }
    loadOnboardingStatus()
  }, [])

  useEffect(() => {
    const stepFromUrl = searchParams.get('step')
    if (stepFromUrl) {
      const parsedStep = parseFloat(stepFromUrl) as OnboardingStep
      if ((parsedStep >= 1 && parsedStep <= 8) || parsedStep === 3.5 || parsedStep === 4.5 || parsedStep === 5.5) {
        if (parsedStep !== step) {
          setStep(parsedStep)
        }
      }
    }
  }, [searchParams, step])

  useEffect(() => {
    if (step === 5.5 && !participantData) {
      setStep(5)
      setSearchParams({ step: '5' })
    }
  }, [step, participantData, setSearchParams])

  const handleUserTypeSelected = async (type: UserType) => {
    setUserType(type)

    if (!isTempToken) {
      const userId = getUserId()
      if (userId) {
        try {
          const userTypeMap: Record<UserType, string> = {
            individual: 'INDIVIDUAL',
            multiple: 'ORGANIZATION', 
            provider: 'ORGANIZATION',
            government: 'ORGANIZATION',
          }

          await userApi.update(userId, {
            userType: userTypeMap[type] as 'INDIVIDUAL' | 'ORGANIZATION',
          })
        } catch (error) {
          console.error('Failed to update user type:', error)
        }
      }
    }

    await updateStep(2)
  }

  const handleDetailsSubmit = async (data: NDISDetailsFormValues | ProviderDetailsFormValues) => {
    if (!isTempToken) {
      const userId = getUserId()

      if (userType === 'individual' || userType === 'multiple') {
        setNdisDetails(data as NDISDetailsFormValues)

        if (userId && data) {
          try {
            const ndisData = data as NDISDetailsFormValues
            await userApi.updateNdisDetails(userId, {
              participationType: ndisData.participationType === 'ndis' ? 'NDIS_PARTICIPANT' : 'STATE_TERRITORY_SCHEME',
              ndisNumber: ndisData.ndisNumber,
              planManagementType: ndisData.planManagement === 'agency' ? 'AGENCY_MANAGED' :
                ndisData.planManagement === 'plan' ? 'PLAN_MANAGED' : 'SELF_MANAGED',
              planStartDate: ndisData.planStartDate?.toISOString(),
              planEndDate: ndisData.planEndDate?.toISOString(),
            })
          } catch (error) {
            console.error('Failed to update NDIS details:', error)
          }
        }
      } else if (userType === 'provider') {
        setProviderDetails(data as ProviderDetailsFormValues)

        if (userId && data) {
          try {
            const providerData = data as ProviderDetailsFormValues
            await userApi.updateServiceProviderDetails(userId, {
              providerNumber: providerData.providerNumber,
              businessType: providerData.businessType,
              numberOfParticipantsManaged: providerData.participantsManaged,
            })
          } catch (error) {
            console.error('Failed to update provider details:', error)
          }
        }
      }
    } else {
      if (userType === 'individual' || userType === 'multiple') {
        setNdisDetails(data as NDISDetailsFormValues)
      } else if (userType === 'provider') {
        setProviderDetails(data as ProviderDetailsFormValues)
      }
    }
    await updateStep(3)
  }

  const handleCompanyInfoSubmit = async (data: GeneralCompanyInfoFormValues) => {
    setCompanyInfo(data)

    if (!isTempToken) {
      const userId = getUserId()
      if (userId) {
        try {
          await userApi.updateOrganizationAddress(userId, {
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            state: data.state,
            postalCode: data.postcode,
            country: data.country,
            isPrimary: true,
          })

          await userApi.update(userId, {
            organizationName: data.companyName,
            abn: data.abn,
            phoneCountryCode: data.phoneNumber,
            companyType: data.type,
            referralCode: data.referralCode,
          })
        } catch (error) {
          console.error('Failed to update company info:', error)
        }
      }
    }

    await updateStep(3.5)
  }

  const handleCompanyInfoSuccessNext = async () => {
    await updateStep(4)
  }

  const handleSubscriptionSelected = async (planId: string) => {
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId)
    if (plan) {
      setSelectedPlan({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        subtitle: plan.subtitle,
        features: [...plan.features],
      })
    }

    if (!isTempToken) {
      const userId = getUserId()
      if (userId && planId) {
        try {
          await createSubscriptionMutation.mutateAsync({
            subscriptionPlanId: planId,
          })
        } catch (error) {
          console.error('Failed to create subscription:', error)
        }
      }
    }

    await updateStep(4.5, { plan: planId })
  }

  const handleSubscriptionSuccessNext = async () => {
    await updateStep(5)
  }

  const handleSubscriptionSuccessSkip = async () => {
    await updateStep(6)
  }

  const handleParticipantAdded = async (participantFormData: ParticipantFormValues) => {
    const buildParticipantData = (email: string, id?: string) => ({
      id,
      firstName: participantFormData.firstName,
      lastName: participantFormData.lastName,
      email,
      phoneNumber: participantFormData.contact || undefined,
      dateOfBirth: participantFormData.dob || undefined,
      gender: participantFormData.gender || undefined,
      ndisNumber: participantFormData.ndisNumber || undefined,
    })

    const buildParticipantQueryParams = (data: {
      id?: string
      firstName: string
      lastName: string
      email: string
      phoneNumber?: string
      dateOfBirth?: string
      gender?: string
      ndisNumber?: string
    }): Record<string, string> => {
      const params: Record<string, string> = {
        participantFirstName: data.firstName,
        participantLastName: data.lastName,
        participantEmail: data.email,
      }

      if (data.id) {
        params.participantId = String(data.id)
      }
      if (data.phoneNumber) {
        params.participantPhone = data.phoneNumber
      }
      if (data.dateOfBirth) {
        params.participantDob = data.dateOfBirth
      }
      if (data.gender) {
        params.participantGender = data.gender
      }
      if (data.ndisNumber) {
        params.participantNdis = data.ndisNumber
      }

      return params
    }

    let participantForUrl: {
      id?: string
      firstName: string
      lastName: string
      email: string
      phoneNumber?: string
      dateOfBirth?: string
      gender?: string
      ndisNumber?: string
    } | null = null

    if (!isTempToken) {
      const userId = getUserId()
      if (userId) {
        try {
          const email = participantFormData.noEmail || !participantFormData.email
            ? `${participantFormData.firstName}.${participantFormData.lastName}@temp.com`
            : participantFormData.email

          const response = await createUserMutation.mutateAsync({
            userType: 'INDIVIDUAL',
            firstName: participantFormData.firstName,
            lastName: participantFormData.lastName,
            email,
            phone: participantFormData.contact || undefined,
            password: 'TempPassword123!',
            status: 'ACTIVE',
          })

          const participant = buildParticipantData(email, response.data?.id)
          setParticipantData(participant)
          participantForUrl = participant
        } catch (error) {
          console.error('Failed to create participant:', error)
          const email =
            participantFormData.email ||
            `${participantFormData.firstName}.${participantFormData.lastName}@temp.com`
          const participant = buildParticipantData(email)
          setParticipantData(participant)
          participantForUrl = participant
        }
      } else {
        const email = participantFormData.noEmail || !participantFormData.email
          ? `${participantFormData.firstName}.${participantFormData.lastName}@temp.com`
          : participantFormData.email
        const participant = buildParticipantData(email)
        setParticipantData(participant)
        participantForUrl = participant
      }
    } else {
      const email = participantFormData.noEmail || !participantFormData.email
        ? `${participantFormData.firstName}.${participantFormData.lastName}@temp.com`
        : participantFormData.email
      const participant = buildParticipantData(email)
      setParticipantData(participant)
      participantForUrl = participant
    }

    if (participantForUrl) {
      await updateStep(5.5, buildParticipantQueryParams(participantForUrl))
    }
  }

  const handleParticipantSuccessNext = async () => {
    await updateStep(6)
  }

  const handleWalletCreated = async () => {
    if (!isTempToken) {
      const userId = getUserId()
      if (userId) {
        try {
          const userIds = participantData?.id ? [participantData.id, userId] : [userId]

          const response = await createWalletMutation.mutateAsync({
            name: 'Main Wallet',
            currency: 'USD',
            status: 'ACTIVE',
            userIds,
          })

          if (response.data?.id) {
            setWalletId(String(response.data.id))
          } else if (response.data?.data?.id) {
            setWalletId(String(response.data.data.id))
          }
        } catch (error) {
          console.error('Failed to create wallet:', error)
        }
      }
    }

    await updateStep(7)
  }

  const handleCardOrdered = async () => {
    if (!isTempToken) {
      const userId = getUserId()
      if (userId && walletId && companyInfo) {
        try {
          await orderCardMutation.mutateAsync({
            userId,
            walletId,
            deliveryAddress: {
              addressLine1: companyInfo.addressLine1,
              addressLine2: companyInfo.addressLine2,
              city: companyInfo.city,
              state: companyInfo.state,
              postcode: companyInfo.postcode,
              country: companyInfo.country,
            },
          })
        } catch (error) {
          console.error('Failed to order card:', error)
        }
      }
    }

    if (!isTempToken) {
      const userId = getUserId()
      if (userId) {
        try {
          await userApi.updateOnboardingStatus({ onboardingStatus: 'COMPLETED' })
        } catch (error) {
          console.error('Failed to update onboarding status to COMPLETED:', error)
        }
      }
    }

    await updateStep(8)
  }

  const handleOnboardingComplete = async () => {
    navigate(ROUTES.DASHBOARD.HOME)
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              <UserTypeSelection
                onBack={() => navigate(ROUTES.AUTH.LOGIN)}
                onNext={handleUserTypeSelected}
                defaultValue={userType || undefined}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              {userType === 'individual' || userType === 'multiple' ? (
                <NDISDetailsForm
                  onBack={() => updateStep(1)}
                  onNext={handleDetailsSubmit}
                  defaultValues={ndisDetails || undefined}
                />
              ) : userType === 'provider' ? (
                <ProviderDetailsForm
                  onBack={() => updateStep(1)}
                  onNext={handleDetailsSubmit}
                  defaultValues={providerDetails || undefined}
                />
              ) : (
                <OrganisationDetailsPlaceholder
                  type={userType === 'government' ? 'government' : 'multiple'}
                  onBack={() => updateStep(1)}
                  onNext={async () => await updateStep(3)}
                />
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              <GeneralCompanyInfoForm
                onBack={() => updateStep(2)}
                onNext={handleCompanyInfoSubmit}
                defaultValues={companyInfo || undefined}
              />
            </div>
          </div>
        )

      case 3.5:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              <GeneralCompanyInfoSuccess
                formData={null}
                userType={userType}
                companyInfo={companyInfo}
                onNext={handleCompanyInfoSuccessNext}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              <SelectSubscription
                onBack={() => updateStep(3.5)}
                onNext={handleSubscriptionSelected}
              />
            </div>
          </div>
        )

      case 4.5:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              {selectedPlan ? (
                <SubscriptionSuccess
                  selectedPlan={selectedPlan}
                  onSkip={handleSubscriptionSuccessSkip}
                  onAddParticipant={handleSubscriptionSuccessNext}
                />
              ) : null}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              <AddParticipant
                defaultValues={
                  participantData
                    ? {
                        title: '',
                        firstName: participantData.firstName,
                        lastName: participantData.lastName,
                        dob: participantData.dateOfBirth || '',
                        email: participantData.email,
                        noEmail: false,
                        gender: participantData.gender || '',
                        contact: participantData.phoneNumber || '',
                        noPhone: false,
                        ndisNumber: participantData.ndisNumber || '',
                        agreeToTerms: false,
                      }
                    : undefined
                }
                onBack={() => updateStep(4.5)}
                onNext={handleParticipantAdded}
              />
            </div>
          </div>
        )

      case 5.5:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              {participantData ? (
                <ParticipantSuccess
                  participantData={participantData}
                  onNext={handleParticipantSuccessNext}
                  onGoToDashboard={handleOnboardingComplete}
                  onEdit={() => updateStep(5)}
                />
              ) : null}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              <AddWallet
                onBack={() => updateStep(5.5)}
                onNext={handleWalletCreated}
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              <OrderCard
                onBack={() => updateStep(6)}
                onNext={handleCardOrdered}
              />
            </div>
          </div>
        )

      case 8:
        return (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-center flex-1 px-4 lg:px-16 py-8">
              <OnboardingComplete
                formData={null}
                userType={userType}
                companyInfo={companyInfo}
                onComplete={handleOnboardingComplete}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const showSidebar = step >= 3 && step <= 7
  // Convert step for sidebar:
  // 3 -> 1 (General Company Info - form)
  // 3.5 -> 2 (General Company Info Success - success screen, step 2 completed)
  // 4 -> 3 (Select Subscription)
  // 4.5 -> 3 (Subscription Success - success screen, step 3 completed)
  // 5 -> 4 (Add Participant)
  // 5.5 -> 4 (Participant Success - success screen, step 4 completed)
  // 6 -> 5 (Add Wallet)
  // 7 -> 6 (Order Card)
  const getSidebarStep = (): number => {
    if (step === 3) return 1
    if (step === 3.5) return 2 // On success screen show step 2 as completed
    if (step === 4) return 3
    if (step === 4.5) return 3 // On subscription success screen show step 3 as completed
    if (step === 5) return 4
    if (step === 5.5) return 4 // On participant success screen show step 4 as completed
    if (step >= 6 && step <= 7) return step - 1
    return 1
  }
  const sidebarStep = showSidebar ? getSidebarStep() : 1
  const isSuccessScreen = step === 3.5 || step === 4.5 || step === 5.5

  return (
    <div className="min-h-screen flex">
      {showSidebar && <ProgressSidebar currentStep={sidebarStep} isSuccessScreen={isSuccessScreen} />}

      {/* Main Content */}
      {renderStepContent()}
    </div>
  )
}

