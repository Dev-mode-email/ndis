import {axiosInstance} from "@/core/api/axios";

export const generateAiApi = {
    generateAiForm: async(prompt: string, questionCount: number, language: string) => {
        const response = await axiosInstance.post<JSON>(`/ai-generation/generate-form`, { 
            prompt, 
            questionsCount: questionCount, 
            language 
        })
        return response.data
    },
}
