import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Calendar, Check } from 'lucide-react'
import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/inputs/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import { format } from 'date-fns'
import { Calendar as CalendarComponent } from '@/core/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/core/components/ui/popover'

const ndisDetailsSchema = z.object({
  participationType: z.enum(['ndis', 'state']),
  ndisNumber: z.string().optional(),
  planManagement: z.enum(['agency', 'plan', 'self']).optional(),
  planStartDate: z.date().optional(),
  planEndDate: z.date().optional(),
})

export type NDISDetailsFormValues = z.infer<typeof ndisDetailsSchema>

interface NDISDetailsFormProps {
  onBack: () => void
  onNext: (data: NDISDetailsFormValues) => void
  defaultValues?: Partial<NDISDetailsFormValues>
}

export const NDISDetailsForm = ({ onBack, onNext, defaultValues }: NDISDetailsFormProps) => {
  const form = useForm<NDISDetailsFormValues>({
    resolver: zodResolver(ndisDetailsSchema),
    defaultValues: {
      participationType: defaultValues?.participationType || 'ndis',
      ndisNumber: defaultValues?.ndisNumber || '',
      planManagement: defaultValues?.planManagement,
      planStartDate: defaultValues?.planStartDate,
      planEndDate: defaultValues?.planEndDate,
    },
  })

  const participationType = form.watch('participationType')
  const planManagement = form.watch('planManagement')
  const planStartDate = form.watch('planStartDate')
  const planEndDate = form.watch('planEndDate')

  const calculatePlanDuration = () => {
    if (!planStartDate || !planEndDate) return null
    const months = Math.round((planEndDate.getTime() - planStartDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
    return `${months} Month Plan`
  }

  const onSubmit = (data: NDISDetailsFormValues) => {
    onNext(data)
  }

  const RadioButton = ({ 
    selected, 
    label, 
    onClick 
  }: { 
    selected: boolean
    label: string
    onClick: () => void 
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-between gap-6 px-5 py-4 rounded-2xl transition-all ${
        selected
          ? 'bg-gray-50 border border-primary-400'
          : 'bg-gray-50 border border-transparent'
      }`}
    >
      <span className="font-gotham text-base font-normal text-primary-700">
        {label}
      </span>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
        selected ? 'border-primary-400 bg-primary-400' : 'border-gray-300 bg-white'
      }`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
      </div>
    </button>
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[888px]">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-700 px-6 py-10 space-y-2">
            <h1 className="font-gotham text-2xl font-normal text-white text-center leading-6">
              Individual Participant NDIS Details
            </h1>
            <p className="font-gotham text-base font-light text-white text-center leading-6">
              Please provide your NDIS plan details so we can set up your account correctly.
            </p>
          </div>

          {/* Form Content */}
          <div className="px-5 py-6 space-y-6 border-t border-gray-100">
            {/* Section 1: Participation Type */}
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-2.5">
                  <div className="mt-0.5">
                    <Check className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-gotham text-base font-normal text-gray-900 leading-6">
                      Selecting the type of participation*
                    </h3>
                    <p className="font-gotham text-sm font-light text-gray-500 leading-5">
                      Are you an NDIS Participant or on another State or Territory based Scheme?
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <RadioButton
                    selected={participationType === 'ndis'}
                    label="NDIS Participant"
                    onClick={() => form.setValue('participationType', 'ndis')}
                  />
                  <RadioButton
                    selected={participationType === 'state'}
                    label="State / Territory Scheme"
                    onClick={() => form.setValue('participationType', 'state')}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: NDIS Number */}
            <FormField
              control={form.control}
              name="ndisNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900">
                    NDIS Number*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="430012502"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Section 3: NDIS Plan */}
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-2.5">
                  <div className="mt-0.5">
                    <Check className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-gotham text-base font-normal text-gray-900 leading-6">
                      NDIS Plan*
                    </h3>
                    <p className="font-gotham text-sm font-light text-gray-500 leading-5">
                      How is your NDIS Plan managed?
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <RadioButton
                    selected={planManagement === 'agency'}
                    label="Agency Managed"
                    onClick={() => form.setValue('planManagement', 'agency')}
                  />
                  <RadioButton
                    selected={planManagement === 'plan'}
                    label="Plan Managed"
                    onClick={() => form.setValue('planManagement', 'plan')}
                  />
                  <RadioButton
                    selected={planManagement === 'self'}
                    label="Self Managed"
                    onClick={() => form.setValue('planManagement', 'self')}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Plan Timing */}
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-2.5">
                  <div className="mt-0.5">
                    <Check className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-gotham text-base font-normal text-gray-900 leading-6">
                      Plan Timing*
                    </h3>
                    <p className="font-gotham text-sm font-light text-gray-500 leading-5">
                      What are your Plan Dates?
                    </p>
                  </div>
                </div>

                <div className="pl-8 space-y-2.5">
                  <div className="flex gap-4">
                    {/* Plan Start Date */}
                    <FormField
                      control={form.control}
                      name="planStartDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-base font-medium text-gray-900">
                            Plan Start Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full h-12 justify-between text-left font-normal"
                                >
                                  {field.value ? format(field.value, 'dd/MM/yyyy') : '07/10/2025'}
                                  <Calendar className="w-6 h-6 text-gray-400" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Plan End Date */}
                    <FormField
                      control={form.control}
                      name="planEndDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-base font-medium text-gray-900">
                            Plan End Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full h-12 justify-between text-left font-normal"
                                >
                                  {field.value ? format(field.value, 'dd/MM/yyyy') : '31/12/2025'}
                                  <Calendar className="w-6 h-6 text-gray-400" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Duration Display */}
                  {calculatePlanDuration() && (
                    <div className="bg-gray-50 px-6 py-4 rounded-lg">
                      <div className="space-y-1">
                        <p className="font-gotham text-sm font-normal text-gray-600">
                          {calculatePlanDuration()}
                        </p>
                        <p className="font-gotham text-sm font-light text-gray-600">
                          {planStartDate && format(planStartDate, 'dd/MM/yyyy')} - {planEndDate && format(planEndDate, 'dd/MM/yyyy')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="h-1 bg-gray-50" />

          {/* Footer with buttons */}
          <div className="bg-white px-5 py-3">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 h-12 text-base font-medium text-gray-400"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 text-base font-medium"
              >
                Next Step
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

