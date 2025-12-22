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
import { useGeneratedFormStore } from '@/core/stores/useGeneratedFormStore'
import { useGenerateAiForm } from '@/core/hooks/api/useGenerateAiForm'
import { ROUTES } from '@/core/constants/routes'
import { useCreateForm } from '@/entities/form/api-hooks/useForm'
import { CreateFormPayload, Option } from '@/entities/form/types/form'
import { useAuthStore } from '@/core/stores/authStore'

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

export const PromptFormPreviewPage = () => {
  const navigate = useNavigate()
  const { generatedForm, generationParams, setGenerationParams } = useGeneratedFormStore()
  const user = useAuthStore((state) => state.user)
  const { mutate: generateAiForm, isPending } = useGenerateAiForm()
  const { mutate: createForm, isPending: isCreating } = useCreateForm()

  if (!generatedForm || !generationParams) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full min-h-[400px]">
        <p className="text-lg text-muted-foreground">No generated form found</p>
        <Button onClick={() => navigate(ROUTES.ADMIN.FORMS.PROMPT_PANEL)}>
          Go to Generate Page
        </Button>
      </div>
    )
  }

  const sortedQuestions = [...(generatedForm.questions || [])].sort(
    (a, b) => a.question_order - b.question_order
  )

  const handleRegenerate = () => {
    generateAiForm({
      prompt: generationParams.prompt,
      questionCount: generationParams.questionCount,
      language: generationParams.language,
    })
  }

  const handleGenerateLiveForm = () => {
    if (!generatedForm) return

    const formPayload: CreateFormPayload = {
      title: generatedForm.title,
      userId: user?.userId,
      language: generatedForm.language,
      stepCount: generatedForm.stepCount,
      start_markup: generatedForm.start_markup || '',
      end_markup: generatedForm.end_markup || '',
      agentId: generatedForm.agentId || null,
      questions: sortedQuestions.map((q) => ({
        question_text: q.question_text,
        question_sub_text: q.question_sub_text,
        step: q.step,
        question_order: q.question_order,
        question_type: q.question_type,
        question_display_type: q.question_display_type,
        maxValue: q.maxValue,
        minValue: q.minValue,
        maxLabel: q.maxLabel,
        minLabel: q.minLabel,
        question_image_id: q.question_image_id,
        has_other_option: q.has_other_option,
        options: q.options?.map((opt: Option) => ({
          option_text: opt.option_text,
          order: opt.order,
          option_image_url: opt.option_image_url,
          point: opt.point,
        })),
      })),
    }

    createForm(formPayload, {
      onSuccess: (data) => {
        if (data?.id) {
          navigate(ROUTES.ADMIN.FORMS.DETAILS(String(data.id)))
        }
      },
    })
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-[733px] mx-auto py-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="text-[60px] font-medium leading-[90px] text-center text-[#363636] w-full">
          {generatedForm.title}
        </h1>
      </div>

      {/* Generate from Prompt Section */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#363636]">Generate from Prompt:</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Select
            value={String(generationParams.questionCount)}
            onValueChange={(value) =>
              setGenerationParams({
                ...generationParams,
                questionCount: parseInt(value),
              })
            }
          >
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

          <Select
            value={generationParams.language}
            onValueChange={(value) =>
              setGenerationParams({
                ...generationParams,
                language: value as 'en' | 'he' | 'ru' | 'ar',
              })
            }
          >
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

          <Button
            onClick={handleRegenerate}
            disabled={isPending}
            variant="outline"
            className="h-10 px-4"
          >
            {isPending ? 'Regenerating...' : 'Regenerate'}
          </Button>
        </div>

        <div className="box-border flex flex-row justify-center items-center p-5 px-8 gap-2.5 w-full min-h-[94px] bg-[#F5F5F5] border border-[#E3E3E3] rounded-lg">
          <Textarea
            value={generationParams.prompt}
            onChange={(e) =>
              setGenerationParams({
                ...generationParams,
                prompt: e.target.value,
              })
            }
            className="w-full min-h-[54px] text-lg font-normal leading-[27px] text-[#363636] border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      {/* Introduction / Welcome text Section */}
      {generatedForm.start_markup && (
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-medium text-[#363636]">Introduction / Welcome text:</h2>
          <div className="box-border flex flex-row justify-center items-center p-5 px-8 gap-2.5 w-full min-h-[94px] bg-[#F5F5F5] border border-[#E3E3E3] rounded-lg">
            <p className="w-full text-base font-normal leading-[24px] text-[#363636] whitespace-pre-wrap">
              {generatedForm.start_markup}
            </p>
          </div>
        </div>
      )}

      {/* Form Questions Preview Section */}
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-lg font-medium text-[#363636]">Form Questions Preview:</h2>
        <div className="box-border flex flex-col gap-6 p-5 px-8 w-full bg-[#F5F5F5] border border-[#E3E3E3] rounded-lg">
          {sortedQuestions.map((question, index) => (
            <div key={question.id || index} className="flex flex-col gap-2">
              <p className="text-base font-normal leading-[24px] text-[#363636]">
                {index + 1}. {question.question_text}
              </p>
              {question.question_sub_text && (
                <p className="text-sm font-normal leading-[20px] text-[#666666] ml-4">
                  {question.question_sub_text}
                </p>
              )}
              {(question.question_type === 'OPTION' ||
                question.question_type === 'MULTI_OPTION') &&
                question.options &&
                question.options.length > 0 && (
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    {question.options
                      .sort((a: Option, b: Option) => a.order - b.order)
                      .map((option: Option, optIndex: number) => (
                        <li
                          key={option.id || optIndex}
                          className="text-sm font-normal leading-[20px] text-[#666666]"
                        >
                          {option.option_text}
                        </li>
                      ))}
                  </ul>
                )}
            </div>
          ))}
        </div>
      </div>

      {/* Generate Live Form Button */}
      <Button
        onClick={handleGenerateLiveForm}
        disabled={isCreating}
        variant="default"
        className="px-5 py-3 h-[51px] rounded-lg text-lg font-semibold leading-[27px] text-white bg-[#363636] hover:bg-[#2a2a2a]"
      >
        {isCreating ? 'Creating...' : 'Ready? Generate live form'}
      </Button>
    </div>
  )
}
