import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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

const companyInfoSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  abn: z.string().min(1, 'ABN is required'),
  phoneNumber: z.string().optional(),
  type: z.string().min(1, 'Type is required'),
  referralCode: z.string().optional(),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postcode: z.string().min(1, 'Postcode is required'),
  country: z.string().min(1, 'Country is required'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Use & Privacy Policy',
  }),
})

export type GeneralCompanyInfoFormValues = z.infer<typeof companyInfoSchema>

interface GeneralCompanyInfoFormProps {
  onBack: () => void
  onNext: (data: GeneralCompanyInfoFormValues) => void
  defaultValues?: Partial<GeneralCompanyInfoFormValues>
}

export const GeneralCompanyInfoForm = ({ 
  onBack, 
  onNext, 
  defaultValues 
}: GeneralCompanyInfoFormProps) => {
  const form = useForm<GeneralCompanyInfoFormValues>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      companyName: defaultValues?.companyName || '',
      abn: defaultValues?.abn || '',
      phoneNumber: defaultValues?.phoneNumber || '',
      type: defaultValues?.type || '',
      referralCode: defaultValues?.referralCode || '',
      addressLine1: defaultValues?.addressLine1 || '',
      addressLine2: defaultValues?.addressLine2 || '',
      city: defaultValues?.city || '',
      state: defaultValues?.state || '',
      postcode: defaultValues?.postcode || '',
      country: defaultValues?.country || 'Australia',
      agreeToTerms: defaultValues?.agreeToTerms || false,
    },
  })

  const onSubmit = (data: GeneralCompanyInfoFormValues) => {
    onNext(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[888px]">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-700 px-6 py-10 space-y-2">
            <h1 className="font-gotham text-2xl font-normal text-white text-center leading-6">
              General Company Info
            </h1>
          </div>

          {/* Form Content */}
          <div className="px-5 py-6 space-y-6 border-t border-gray-100">
            {/* General Company Info Section */}
            <div className="grid grid-cols-2 gap-4">
              {/* Company Name */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Text Here"
                        className="h-10"
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
                    <FormLabel className="text-sm font-normal text-gray-900">
                      ABN
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Text Here"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Phone Number
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
                        size="sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="sole-trader">Sole Trader</SelectItem>
                        <SelectItem value="trust">Trust</SelectItem>
                        <SelectItem value="non-profit">Non-Profit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Referral Code */}
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Referral Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Text Here"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                What Address should we send the card to?
              </h2>

              {/* Address Lines */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Line 1
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Text Here"
                          className="h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Line 2
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Text Here"
                          className="h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* City, State, Postcode, Country */}
              <div className="grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-900">
                        City
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sydney">Sydney</SelectItem>
                          <SelectItem value="melbourne">Melbourne</SelectItem>
                          <SelectItem value="brisbane">Brisbane</SelectItem>
                          <SelectItem value="perth">Perth</SelectItem>
                          <SelectItem value="adelaide">Adelaide</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-900">
                        State
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NSW">NSW</SelectItem>
                          <SelectItem value="VIC">VIC</SelectItem>
                          <SelectItem value="QLD">QLD</SelectItem>
                          <SelectItem value="WA">WA</SelectItem>
                          <SelectItem value="SA">SA</SelectItem>
                          <SelectItem value="TAS">TAS</SelectItem>
                          <SelectItem value="ACT">ACT</SelectItem>
                          <SelectItem value="NT">NT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Postcode
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter"
                          className="h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Country
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="New Zealand">New Zealand</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-gray-900 cursor-pointer">
                      I agree to the{' '}
                      <span className="text-primary-500">Terms of Use & Privacy Policy</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 h-12 text-base font-normal"
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
