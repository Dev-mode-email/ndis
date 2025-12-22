import * as z from 'zod'
import { createFormSchema } from '@/entities/form/schemas'

// Use the schema input type so react-hook-form's resolver and form values stay aligned
export type FormData = z.input<ReturnType<typeof createFormSchema>>;