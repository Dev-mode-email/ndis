import * as z from 'zod'
import { commonValidations } from '@/core/utils/formHelpers'
import { questionSchema } from './questionSchema'


export const createFormSchema = (t: (key: string) => string) => z.object({
    title: commonValidations.requiredString(t),
    agentId: z.string(),
    customAgentId: z.number().optional(),
    questions: z.array(questionSchema),
    startMarkup: z.string(),
    endMarkup: z.string(),
    withOutAiFeedback: z.boolean().optional(),
    withPointsSummary: z.boolean().optional(),
    pointsSummaryTitle: z.string().optional(),
    language: z.string(),
    applicationId: z.string(),
    showCodePage: z.boolean(),
    activeAccordionStep: z.number().nullable(),
    customFormIds: z.array(z.number()),
    partnerLogos: z.array(z.string()),
    contactsInfoId: z.number().optional(),
    interviewerPageId: z.number().optional(),
    termOfServiceUrl: z.string().optional().refine((val) => !val || z.string(). url().safeParse(val).success, {
        message: "Invalid URL format"
    }),
    webhookUrl: z.string().optional(),
    webhookAgentId: z.string().optional(),
}).refine(
    (data) => {
        const webhookUrlEmpty = !data.webhookUrl || data.webhookUrl.trim() === '';
        const webhookAgentIdEmpty = !data.webhookAgentId || data.webhookAgentId.trim() === '';
        return (webhookUrlEmpty && webhookAgentIdEmpty) || (!webhookUrlEmpty && !webhookAgentIdEmpty);
    },
    {
        message: t('admin.forms.edit.webhookFields.error') || 'Webhook URL и Webhook Agent ID должны быть заполнены вместе или оба должны быть пустыми',
        path: ['webhookUrl'],
    }
).refine(
    (data) => {
        const webhookUrlEmpty = !data.webhookUrl || data.webhookUrl.trim() === '';
        const webhookAgentIdEmpty = !data.webhookAgentId || data.webhookAgentId.trim() === '';
        return (webhookUrlEmpty && webhookAgentIdEmpty) || (!webhookUrlEmpty && !webhookAgentIdEmpty);
    },
    {
        message: t('admin.forms.edit.webhookFields.error') || 'Webhook URL и Webhook Agent ID должны быть заполнены вместе или оба должны быть пустыми',
        path: ['webhookAgentId'],
    }
);