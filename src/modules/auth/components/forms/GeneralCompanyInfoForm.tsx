import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/inputs/input'
import { Checkbox } from '@/core/components/ui/inputs/checkbox'
import { PhoneField } from '@/core/components/ui/inputs/phone-field'
import arrowLeftIcon from '@/assets/icons/arrow-left.svg'
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[1040px]">
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)]">
          <div className="px-6 py-8 space-y-4">
            {/* Section Title */}
            <h1 className="text-2xl font-bold text-gray-900 font-gotham">
              General Company Info
            </h1>

            {/* Divider */}
            <div className="bg-gray-50 h-1 w-full" />

            {/* General Company Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Name */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base font-medium text-gray-900">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Text Here"
                        size="sm"
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
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base font-medium text-gray-900">
                      ABN
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Text Here"
                        size="sm"
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
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base font-medium text-gray-900">
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
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base font-medium text-gray-900">
                      Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Corporate" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="corporate-partnership">Corporate Partnership</SelectItem>
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
                  <FormItem className="col-span-2 space-y-2">
                    <FormLabel className="text-base font-medium text-gray-900">
                      Referral Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Text Here"
                        size="sm"
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
              <h2 className="text-2xl font-bold text-gray-900 font-gotham">
                What Address should we send the card to?
              </h2>

              {/* Divider */}
              <div className="bg-gray-50 h-1 w-full" />

              {/* Address Lines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-base font-medium text-gray-900">
                        Line 1
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Text Here"
                          size="sm"
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
                    <FormItem className="space-y-2">
                      <FormLabel className="text-base font-medium text-gray-900">
                        Line 2
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Text Here"
                          size="sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* City, State, Postcode, Country */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-base font-medium text-gray-900">
                        City
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Enter Text Here" />
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
                    <FormItem className="space-y-2">
                      <FormLabel className="text-base font-medium text-gray-900">
                        State
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Enter Text Here" />
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
                    <FormItem className="space-y-2">
                      <FormLabel className="text-base font-medium text-gray-900">
                        Postcode
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Text Here"
                          size="sm"
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
                    <FormItem className="space-y-2">
                      <FormLabel className="text-base font-medium text-gray-900">
                        Country
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Enter Text Here" />
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
                <FormItem className="flex flex-row items-center space-x-4 space-y-0 py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-6 w-6"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-base font-medium text-gray-900 cursor-pointer">
                      I agree to the{' '}
                      <span className="text-[#007DC6]">Terms of Use & Privacy Policy</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 h-12 px-6 bg-white text-gray-400 border-gray-100 hover:bg-white hover:text-gray-400"
              >
                <img src={arrowLeftIcon} alt="" className="h-6 w-6 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 px-6 text-base font-medium bg-[#007DC6] hover:bg-[#00649E]"
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
