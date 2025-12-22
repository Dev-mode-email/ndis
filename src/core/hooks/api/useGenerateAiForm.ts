import { useMutation } from '@tanstack/react-query'
import { generateAiApi } from '@/core/api/generate-ai'
import { toastManager } from '@/core/components/ui/toast/toast'
import { handleApiError } from '@/core/utils/errorHandler'
import { useGeneratedFormStore } from '@/core/stores/useGeneratedFormStore'
import { Form } from '@/entities/form/types/form'

interface GenerateAiFormParams {
    prompt: string
    questionCount: number
    language: string
}

export const useGenerateAiForm = () => {
    const { setGeneratedForm, setGenerationParams } = useGeneratedFormStore()

    return useMutation({
        mutationFn: ({ prompt, questionCount, language }: GenerateAiFormParams) => 
            generateAiApi.generateAiForm(prompt, questionCount, language),
        onSuccess: (data, variables) => {
            setGeneratedForm(data as unknown as Form)
            setGenerationParams({
                prompt: variables.prompt,
                questionCount: variables.questionCount,
                language: variables.language
            })
        },
        onError: (error) => {
            toastManager.error(handleApiError(error, 'Failed to generate AI form'))
        }
    })
}