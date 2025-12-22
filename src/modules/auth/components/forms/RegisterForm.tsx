import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { ROUTES } from '@/core/constants/routes'

import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/inputs/input'
import { Checkbox } from '@/core/components/ui/inputs/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import { PhoneField } from '@/core/components/ui/inputs/phone-field'
import { commonValidations } from '@/core/utils/formHelpers'

const registerSchema = z.object({
  firstName: commonValidations.requiredString('First name is required'),
  lastName: commonValidations.requiredString('Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: commonValidations.email('Email is required'),
  password: commonValidations.password(6),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Use & Privacy Policy',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type RegisterFormValues = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onNext: (data: RegisterFormValues) => void
  defaultValues?: Partial<RegisterFormValues>
}

export const RegisterForm = ({ onNext, defaultValues }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      phoneNumber: defaultValues?.phoneNumber || '',
      email: defaultValues?.email || '',
      password: defaultValues?.password || '',
      confirmPassword: defaultValues?.confirmPassword || '',
      agreeToTerms: defaultValues?.agreeToTerms || false,
    },
  })

  const onSubmit = (data: RegisterFormValues) => {
    console.log('Form submitted with data:', data)
    console.log('Form errors:', form.formState.errors)
    // isValid might be false due to async validation, but if there are no errors - form is valid
    const hasErrors = Object.keys(form.formState.errors).length > 0
    console.log('Form has errors:', hasErrors)
    
    if (hasErrors) {
      console.warn('Form has validation errors, not submitting')
      return
    }
    
    onNext(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name and Last Name in a row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Mae"
                    autoComplete="given-name"
                    className="dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-600"
                    {...field}
                  />
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
                <FormLabel className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Jemision"
                    autoComplete="family-name"
                    className="dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
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
                  size="md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* User Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
                <FormLabel className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                User Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  className="dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        {/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
                <FormLabel className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="i.e. (e.g. Mae Jemision)"
                  autoComplete="username"
                  className="dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Password and Confirm Password in a row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      className="dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-600 pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Confirm password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-600 pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Terms and Policy Checkbox */}
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-[18px] space-y-0 !mt-8">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100 cursor-pointer">
                  I agree to the{' '}
                  <Link
                    to="/terms"
                    className="text-base font-medium leading-6 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms of Use & Privacy Policy
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium !mt-8"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Loading...' : 'Next'}
        </Button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{' '}
          <Link
            to={ROUTES.AUTH.LOGIN}
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  )
}

