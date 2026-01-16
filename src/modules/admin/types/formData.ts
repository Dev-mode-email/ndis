import * as z from 'zod'
import { createFormSchema } from '@/entities/form/schemas'

export type FormData = z.input<ReturnType<typeof createFormSchema>>;