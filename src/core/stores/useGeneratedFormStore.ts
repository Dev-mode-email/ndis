import { create } from 'zustand'
import { Form } from '@/entities/form/types/form'

interface GenerationParams {
    prompt: string
    questionCount: number
    language: string
}

interface GeneratedFormState {
    generatedForm: Form | null
    generationParams: GenerationParams | null
    setGeneratedForm: (form: Form | null) => void
    setGenerationParams: (params: GenerationParams | null) => void
    clearGeneratedForm: () => void
}

export const useGeneratedFormStore = create<GeneratedFormState>((set) => ({
    generatedForm: null,
    generationParams: null,
    setGeneratedForm: (form) => set({ generatedForm: form }),
    setGenerationParams: (params) => set({ generationParams: params }),
    clearGeneratedForm: () => set({ generatedForm: null, generationParams: null }),
}))

