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

const participantSchema = z.object({
  title: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  noEmail: z.boolean().optional(),
  gender: z.string().optional(),
  contact: z.string().optional(),
  noPhone: z.boolean().optional(),
  ndisNumber: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Use & Privacy Policy',
  }),
})

export type ParticipantFormValues = z.infer<typeof participantSchema>

interface AddParticipantProps {
  onBack: () => void
  onNext: (data: ParticipantFormValues) => void
  defaultValues?: ParticipantFormValues
}

export const AddParticipant = ({ onBack, onNext, defaultValues }: AddParticipantProps) => {
  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantSchema),
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      noEmail: false,
      gender: '',
      contact: '',
      noPhone: false,
      ndisNumber: '',
      agreeToTerms: false,
      ...defaultValues,
    },
  })

  const onSubmit = (data: ParticipantFormValues) => {
    onNext(data)
  }

  return (
    <div className="w-full max-w-[1040px]">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)]">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h1 className="font-gotham text-2xl font-normal text-[#101828] leading-[1.5]">
            Personal Information
          </h1>
        </div>

        {/* Divider */}
        <div className="h-1 bg-[#F9FAFB] w-full" />

        {/* Form Content */}
        <div className="px-5 py-6 space-y-6">
          <Form {...form}>
            <form id="participant-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Row (Title + First / Last name) */}
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Mr." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mr">Mr.</SelectItem>
                      <SelectItem value="mrs">Mrs.</SelectItem>
                      <SelectItem value="ms">Ms.</SelectItem>
                      <SelectItem value="mx">Mx.</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* DOB and Email Row */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOB</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Email</FormLabel>
                    <FormControl>
                      <Input placeholder="person@xyz@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="noEmail"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-gray-500 cursor-pointer">
                      Participant does not have email
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Gender and Contact Row */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <PhoneField
                        name={field.name}
                        value={field.value || ''}
                        onPhoneHandler={(phone) => field.onChange(phone)}
                        onBlur={field.onBlur}
                        country="au"
                        size="sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="noPhone"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-gray-500 cursor-pointer">
                      Participant does not have a phone
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* NDIS */}
          <FormField
            control={form.control}
            name="ndisNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NDIS</FormLabel>
                <FormControl>
                  <Input placeholder="Enter NDIS number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms */}
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm cursor-pointer">
                  I agree to the{' '}
                  <span className="text-primary-500">Terms of Use & Privacy Policy</span>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          </form>
        </Form>
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
              type="button"
              onClick={() => form.handleSubmit(onSubmit)()}
              className="flex-1 h-12 text-base font-medium"
            >
              Next Step
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

