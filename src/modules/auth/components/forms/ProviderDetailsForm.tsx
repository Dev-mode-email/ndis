import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Check, HelpCircle } from 'lucide-react'
import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/inputs/input'
import { Checkbox } from '@/core/components/ui/inputs/checkbox'
import { PhoneField } from '@/core/components/ui/inputs/phone-field'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/inputs/select'

const providerDetailsSchema = z.object({
  organisationName: z.string().min(1, 'Organisation name is required'),
  abn: z.string().min(1, 'ABN is required'),
  providerNumber: z.string().optional(),
  noProviderNumber: z.boolean().default(false),
  businessType: z.string().min(1, 'Business type is required'),
  participantsManaged: z.enum(['1', '1-10', '11-50', '51-200', '200+']),
  contactEmail: z.string().email('Invalid email format').min(1, 'Contact email is required'),
  supportPhone: z.string().optional(),
})

export type ProviderDetailsFormValues = z.infer<typeof providerDetailsSchema>

interface ProviderDetailsFormProps {
  onBack: () => void
  onNext: (data: ProviderDetailsFormValues) => void
  defaultValues?: Partial<ProviderDetailsFormValues>
}

export const ProviderDetailsForm = ({ onBack, onNext, defaultValues }: ProviderDetailsFormProps) => {
  const form = useForm<ProviderDetailsFormValues>({
    resolver: zodResolver(providerDetailsSchema),
    defaultValues: {
      organisationName: defaultValues?.organisationName || '',
      abn: defaultValues?.abn || '',
      providerNumber: defaultValues?.providerNumber || '',
      noProviderNumber: defaultValues?.noProviderNumber || false,
      businessType: defaultValues?.businessType || '',
      participantsManaged: defaultValues?.participantsManaged || '1',
      contactEmail: defaultValues?.contactEmail || '',
      supportPhone: defaultValues?.supportPhone || '',
    },
  })

  const participantsManaged = form.watch('participantsManaged')
  const noProviderNumber = form.watch('noProviderNumber')

  const onSubmit = (data: ProviderDetailsFormValues) => {
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
          ? 'bg-white border border-gray-100'
          : 'bg-gray-50 border border-transparent'
      }`}
    >
      <span className="font-gotham text-base font-normal text-primary-700">
        {label}
      </span>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
        selected ? 'border-gray-300 bg-white' : 'border-gray-300 bg-white'
      }`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />}
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
              Service Provider Organisation Details
            </h1>
            <p className="font-gotham text-base font-light text-white text-center leading-6">
              Please provide your organisation information to continue setting up your account.
            </p>
          </div>

          {/* Form Content */}
          <div className="px-5 py-6 space-y-6 border-t border-gray-100">
            {/* Organisation Name */}
            <FormField
              control={form.control}
              name="organisationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900 flex items-center gap-2">
                    Organisation Name*
                    <HelpCircle className="w-[18px] h-[18px] text-gray-400" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. BrightCare Support Services"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ABN */}
            <FormField
              control={form.control}
              name="abn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900 flex items-center gap-2">
                    ABN (Australian Business Number)*
                    <HelpCircle className="w-[18px] h-[18px] text-gray-400" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 12 345 678 910"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Provider Number */}
            <div className="flex items-center gap-6">
              <FormField
                control={form.control}
                name="providerNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base font-medium text-gray-900 flex items-center gap-2">
                      Provider Number*
                      <HelpCircle className="w-[18px] h-[18px] text-gray-400" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 1234567"
                        className="h-12"
                        disabled={noProviderNumber}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end pb-1">
                <FormField
                  control={form.control}
                  name="noProviderNumber"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-4 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-medium text-gray-900 cursor-pointer">
                        I don't have a provider number yet
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Business Type */}
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900 flex items-center gap-2">
                    Business Type*
                    <HelpCircle className="w-[18px] h-[18px] text-gray-400" />
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Options" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sole-trader">Sole Trader</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                      <SelectItem value="charity">Charity/Non-Profit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Participants Managed */}
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-2.5">
                  <div className="mt-0.5">
                    <Check className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-gotham text-base font-normal text-gray-900 leading-6">
                      Number of Participants Managed*
                    </h3>
                    <p className="font-gotham text-sm font-light text-gray-500 leading-5">
                      Select the approximate number of participants you currently manage.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <RadioButton
                    selected={participantsManaged === '1'}
                    label="|1"
                    onClick={() => form.setValue('participantsManaged', '1')}
                  />
                  <RadioButton
                    selected={participantsManaged === '1-10'}
                    label="1–10"
                    onClick={() => form.setValue('participantsManaged', '1-10')}
                  />
                  <RadioButton
                    selected={participantsManaged === '11-50'}
                    label="11–50"
                    onClick={() => form.setValue('participantsManaged', '11-50')}
                  />
                  <RadioButton
                    selected={participantsManaged === '51-200'}
                    label="51–200"
                    onClick={() => form.setValue('participantsManaged', '51-200')}
                  />
                  <RadioButton
                    selected={participantsManaged === '200+'}
                    label="200+"
                    onClick={() => form.setValue('participantsManaged', '200+')}
                  />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex gap-6">
              {/* Contact Email */}
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base font-medium text-gray-900 flex items-center gap-2">
                      Contact Email*
                      <HelpCircle className="w-[18px] h-[18px] text-gray-400" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="e.g. support@yourorganisation.com"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Support Line */}
              <FormField
                control={form.control}
                name="supportPhone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base font-medium text-gray-900 flex items-center gap-2">
                      Support Line (Phone)
                      <HelpCircle className="w-[18px] h-[18px] text-gray-400" />
                    </FormLabel>
                    <FormControl>
                      <PhoneField
                        name={field.name}
                        value={field.value || ''}
                        onPhoneHandler={(phone) => {
                          field.onChange(phone);
                        }}
                        onBlur={field.onBlur}
                        country="au"
                        size="md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

