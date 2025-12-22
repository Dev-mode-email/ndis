import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/core/components/ui/button'
import { Textarea } from '@/core/components/ui/inputs/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/inputs/select'
import { useGenerateAiForm } from '@/core/hooks/api/useGenerateAiForm'
import { ROUTES } from '@/core/constants/routes'

const questionCounts = [
  { value: '4', label: '4 questions' },
  { value: '6', label: '6 questions' },
  { value: '8', label: '8 questions' },
  { value: '10', label: '10 questions' },
  { value: '12', label: '12 questions' },
]

const languages = [
  { value: 'en', label: 'English' },
  { value: 'he', label: 'עברית' },
  { value: 'ru', label: 'Русский' },
  { value: 'ar', label: 'العربية' },
]

export const PromptPanelPage = () => {
  const [prompt, setPrompt] = useState('')
  const [questionCount, setQuestionCount] = useState('8')
  const [language, setLanguage] = useState('en')
  const navigate = useNavigate()

  const { mutate: generateAiForm, isPending } = useGenerateAiForm()

  const handleGenerate = () => {
    generateAiForm(
      { 
        prompt, 
        questionCount: parseInt(questionCount), 
        language: language as 'en' | 'he' | 'ru' | 'ar' 
      },
      {
        onSuccess: () => {
          navigate(ROUTES.ADMIN.FORMS.PROMPT_FORM_PREVIEW)
        }
      }
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-[733px] mx-auto py-8">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-8 w-full">
        <h1 className="text-[60px] font-medium leading-[90px] text-center text-[#363636] w-full">
          Generate
        </h1>
        
        <p className="text-lg font-normal leading-[27px] text-center text-[#434343] w-full">
          Define the purpose of your form – what do you want to learn from your audience?
        </p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Textarea */}
        <div className="box-border flex flex-row justify-center items-center p-5 px-8 gap-2.5 w-full min-h-[94px] bg-white border border-black rounded-lg">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: I want to create a form for my audience to understand their main needs and how I can help them better."
            className="w-full min-h-[54px] text-lg font-normal leading-[27px] text-[#989898] border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#989898]"
          />
        </div>

        {/* Selects */}
        <div className="flex flex-row items-center gap-4">
          <Select value={questionCount} onValueChange={setQuestionCount}>
            <SelectTrigger className="h-10 px-3 py-2 gap-2 border border-[#E3E3E3] rounded-lg bg-white w-[141px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {questionCounts.map((count) => (
                <SelectItem key={count.value} value={count.value}>
                  {count.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-10 px-3 py-2 gap-2 border border-[#E3E3E3] rounded-lg bg-white w-[104px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isPending || !prompt.trim()}
        variant="admin-primary"
        className="px-5 py-3 h-[51px] rounded-lg text-lg font-semibold leading-[27px]"
      >
        {isPending ? 'Generating...' : 'Generate draft form'}
      </Button>
    </div>
  )
}
