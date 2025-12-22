import { useState } from 'react'
import { cn } from '@/core/lib/utils'

interface NPSSurveyProps {
  onSubmit?: (score: number) => void
}

export const NPSSurvey = ({ onSubmit }: NPSSurveyProps) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSelect = (score: number) => {
    setSelectedScore(score)
  }

  const handleSubmit = () => {
    if (selectedScore !== null) {
      onSubmit?.(selectedScore)
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-gray-900 dark:text-white font-medium">
            Thank you for your feedback!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        How likely are you to recommend us to a participant?
      </h3>
      
      <div className="flex justify-between gap-1 mb-3">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => handleSelect(num)}
            className={cn(
              'w-8 h-8 rounded-full text-sm font-medium transition-all',
              selectedScore === num
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300'
            )}
          >
            {num}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
        <span>Not likely</span>
        <span>Very likely</span>
      </div>

      {selectedScore !== null && (
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Submit Feedback
        </button>
      )}
    </div>
  )
}

