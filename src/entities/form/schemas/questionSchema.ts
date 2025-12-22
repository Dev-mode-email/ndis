import * as z from 'zod'
import { optionSchema } from './optionSchema'

export const questionSchema = z.object({
    id: z.number().optional(),
    question_text: z.string(),
    question_sub_text: z.string().nullish(),
    question_type: z.enum(['OPTION', 'MULTI_OPTION', 'INPUT', 'NUMBER', 'CHECKBOX', 'AUDIO', 'AUDIO_OR_TEXT', 'BOOLEAN']),
    question_display_type: z.enum(['FULL_CARD', 'CARD', 'TEXT_INPUT', 'TEXT_AREA', 'SLIDER', 'NUM_PAD', 'NUMBER_KEYBOARD', 'CHECKBOX', 'AUDIO_RECORDER', 'SWITCH']),
    question_image_id: z.string().optional(),
    question_image_url: z.string().optional(),
    step: z.number(),
    originalStep: z.number().optional(),
    question_order: z.number(),
    options: z.array(optionSchema),
    maxValue: z.number().nullable().transform((val) => val ?? 0),
    minValue: z.number().nullable().transform((val) => val ?? 0),
    maxLabel: z.string().nullable().transform((val) => val ?? ''),
    minLabel: z.string().nullable().transform((val) => val ?? ''),
    has_other_option: z.boolean().optional()
});