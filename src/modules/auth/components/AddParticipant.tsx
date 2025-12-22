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

type ParticipantFormValues = z.infer<typeof participantSchema>

interface AddParticipantProps {
  onBack: () => void
  onNext: () => void
}

export const AddParticipant = ({ onBack, onNext }: AddParticipantProps) => {
  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantSchema),
    defaultValues: {
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
    },
  })

  const onSubmit = () => {
    onNext()
  }

  return (
    <div className="w-full max-w-[700px]">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Personal Information</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
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
                    <Input placeholder="Enter last name" {...field} />
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

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12">
              Back
            </Button>
            <Button type="submit" className="flex-1 h-12">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}









