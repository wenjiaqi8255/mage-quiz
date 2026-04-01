import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { questions, type Dimension } from '../data/quizConfig'
import { calculateResult, type Result } from '../utils/calculateResult'

interface Answers {
  src: (string | null)[]
  met: (string | null)[]
  cst: (string | null)[]
}

// Map Dimension to Answers key
const dimensionToKey = (dimension: Dimension): 'src' | 'met' | 'cst' => {
  switch (dimension) {
    case 'source': return 'src'
    case 'method': return 'met'
    case 'cost': return 'cst'
  }
}

interface QuizContextType {
  currentQuestion: number
  answers: Answers
  setAnswer: (dimension: Dimension, index: number, value: string) => void
  getAnswer: (dimension: Dimension, index: number) => string | null
  nextQuestion: () => void
  prevQuestion: () => void
  goToQuestion: (index: number) => void
  isFirstQuestion: boolean
  isLastQuestion: boolean
  canProceed: boolean
  calculateAndGetResult: () => Result | null
  reset: () => void
  totalQuestions: number
}

const QuizContext = createContext<QuizContextType | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    src: new Array(3).fill(null),
    met: new Array(3).fill(null),
    cst: new Array(3).fill(null)
  })

  const currentDimension = questions[currentQuestion].dimension

  const setAnswer = useCallback((dimension: Dimension, index: number, value: string) => {
    const key = dimensionToKey(dimension)
    setAnswers(prev => ({
      ...prev,
      [key]: prev[key].map((v: string | null, i: number) => i === index ? value : v)
    }))
  }, [])

  const getAnswer = useCallback((dimension: Dimension, index: number): string | null => {
    const key = dimensionToKey(dimension)
    return answers[key][index]
  }, [answers])

  const nextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }, [currentQuestion])

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }, [currentQuestion])

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index)
    }
  }, [])

  // Use index_in_dimension from JSON config (1-based, convert to 0-based)
  const currentQ = questions[currentQuestion]
  const dimensionIndex = currentQ ? currentQ.index_in_dimension - 1 : 0
  const dimensionKey = dimensionToKey(currentDimension)
  const currentAnswer = answers[dimensionKey][dimensionIndex]

  const isFirstQuestion = currentQuestion === 0
  const isLastQuestion = currentQuestion === questions.length - 1
  const canProceed = currentAnswer !== null

  const calculateAndGetResult = useCallback((): Result | null => {
    return calculateResult(answers)
  }, [answers])

  const reset = useCallback(() => {
    setCurrentQuestion(0)
    setAnswers({
      src: new Array(3).fill(null),
      met: new Array(3).fill(null),
      cst: new Array(3).fill(null)
    })
  }, [])

  return (
    <QuizContext.Provider value={{
      currentQuestion,
      answers,
      setAnswer,
      getAnswer,
      nextQuestion,
      prevQuestion,
      goToQuestion,
      isFirstQuestion,
      isLastQuestion,
      canProceed,
      calculateAndGetResult,
      reset,
      totalQuestions: questions.length
    }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}