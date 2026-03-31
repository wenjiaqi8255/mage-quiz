import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { questions, dimensions, type Dimension } from '../data/quizConfig'

// Map Dimension to Answers key
const dimensionToKey = (dimension: Dimension): 'src' | 'met' | 'cst' => {
  switch (dimension) {
    case 'source': return 'src'
    case 'method': return 'met'
    case 'cost': return 'cst'
  }
}

// Derive dimension labels from dimensions config
const dimensionLabels: Record<string, string> = {
  source: dimensions.source.label,
  method: dimensions.method.label,
  cost: dimensions.cost.label
}

export default function Quiz() {
  const navigate = useNavigate()
  const {
    currentQuestion,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    isFirstQuestion,
    isLastQuestion,
    canProceed,
    totalQuestions
  } = useQuiz()

  const question = questions[currentQuestion]
  const dimension = question.dimension

  // Calculate the index within the dimension (0-2 for each dimension)
  const dimensionIndex = currentQuestion % 3
  const dimensionKey = dimensionToKey(dimension)
  const currentAnswer = answers[dimensionKey][dimensionIndex]
  const progress = Math.round((currentQuestion / totalQuestions) * 100)

  const handleOptionClick = (value: string) => {
    setAnswer(dimension, dimensionIndex, value)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      navigate('/result')
    } else {
      nextQuestion()
    }
  }

  return (
    <div className="min-h-screen relative" style={{ background: '#0a0a0b' }}>
      {/* Background */}
      <div className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124, 92, 191, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(201, 169, 98, 0.04) 0%, transparent 40%),
            radial-gradient(ellipse 50% 50% at 20% 60%, rgba(201, 169, 98, 0.03) 0%, transparent 30%),
            #0a0a0b`
        }}
      />

      <style>{`
        .progress-fill {
          background: linear-gradient(90deg, #8a7642, #c9a962);
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .option-btn {
          background: #1a1a1d;
          border: 1px solid #2a2a30;
          border-radius: 8px;
          padding: 16px 20px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .option-btn:hover {
          border-color: #3a3a42;
          transform: translateY(-1px);
        }
        .option-btn.selected {
          border-color: #c9a962;
          background: linear-gradient(135deg, rgba(201, 169, 98, 0.1), #1a1a1d);
        }
        .option-btn.selected::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #c9a962, #8a7642);
        }
        .opt-letter {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: #5a5a60;
          margin-bottom: 6px;
          font-style: italic;
        }
        .option-btn.selected .opt-letter {
          color: #c9a962;
        }
        .nav-btn {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          color: #8a8a8f;
          background: transparent;
          border: 1px solid #2a2a30;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .nav-btn:hover:not(:disabled) {
          color: #e8e6e3;
          border-color: #3a3a42;
        }
        .nav-btn:disabled {
          opacity: 0.3;
          cursor: default;
        }
        .nav-btn.primary {
          background: linear-gradient(135deg, #c9a962, #8a7642);
          color: #0a0a0b;
          border: none;
        }
        .nav-btn.primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #d4b978, #c9a962);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(201, 169, 98, 0.2);
        }
        .nav-btn.primary:disabled {
          opacity: 0.3;
          cursor: default;
          background: #3a3a42;
        }
        .glow-border {
          background: #121214;
          border: 1px solid #2a2a30;
          border-radius: 12px;
        }
      `}</style>

      <div className="max-w-xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-lg tracking-widest text-[#e8e6e3] mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            法师流派测算
          </h1>
          <p className="text-sm text-[#5a5a60] font-display italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            共九问，依心而答
          </p>
        </div>

        {/* Progress */}
        <div className="progress-track h-[2px] bg-[#2a2a30] rounded mb-8 overflow-hidden">
          <div className="progress-fill h-full rounded" style={{ width: `${progress}%` }} />
        </div>

        {/* Question counter */}
        <div className="text-xs tracking-[0.2em] text-[#5a5a60] mb-4 text-center font-display" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          第 {currentQuestion + 1} 问 / {totalQuestions} · {dimensionLabels[dimension]}
        </div>

        {/* Question */}
        <div className="glow-border p-6 mb-6">
          <p className="text-[#e8e6e3] text-lg leading-relaxed" style={{ fontFamily: 'Noto Serif SC, serif' }}>
            {question.text}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, i) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`option-btn w-full relative ${currentAnswer === option.value ? 'selected' : ''}`}
            >
              <div className="opt-letter">{['I', 'II', 'III'][i]}</div>
              <div className="text-[#e8e6e3] text-[15px] leading-relaxed">
                {option.text}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={isFirstQuestion}
            className="nav-btn"
          >
            ← 上一问
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="nav-btn primary"
          >
            {isLastQuestion ? '揭示结果 →' : '下一问 →'}
          </button>
        </div>
      </div>
    </div>
  )
}