import * as z from 'zod'

export const optionSchema = z.object({
    id: z.number().optional(),
    option_text: z.string(),
    order: z.number(),
    option_image_url: z.string().url().optional(),
    point: z.number().optional(),
});