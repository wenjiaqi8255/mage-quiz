import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import ShareButton from '../components/ShareButton'

export default function Result() {
  const navigate = useNavigate()
  const { calculateAndGetResult, reset, answers } = useQuiz()

  const result = calculateAndGetResult()

  // Check if all questions are answered
  const allAnswered =
    answers.src.every(a => a !== null) &&
    answers.met.every(a => a !== null) &&
    answers.cst.every(a => a !== null)

  if (!allAnswered) {
    navigate('/quiz')
    return null
  }

  if (!result) {
    navigate('/quiz')
    return null
  }

  const handleRestart = () => {
    reset()
    navigate('/')
  }

  const formatScores = (scores: Record<string, number>) => {
    return Object.entries(scores)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k}×${v}`)
      .join(' ') || '—'
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
        .rune-symbol {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px;
          background: linear-gradient(135deg, #c9a962, #d4b978, #8a7642);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(201, 169, 98, 0.3));
          animation: runeGlow 3s ease-in-out infinite;
        }
        @keyframes runeGlow {
          0%, 100% { filter: drop-shadow(0 0 30px rgba(201, 169, 98, 0.3)); }
          50% { filter: drop-shadow(0 0 40px rgba(201, 169, 98, 0.5)); }
        }
        .stat-card {
          background: #1a1a1d;
          border: 1px solid #2a2a30;
          border-radius: 8px;
          padding: 14px;
          text-align: center;
        }
        .stat-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #5a5a60;
          margin-bottom: 4px;
        }
        .stat-value {
          font-family: 'Noto Serif SC', serif;
          font-size: 14px;
          color: #e8e6e3;
        }
        .restart-btn {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          letter-spacing: 0.08em;
          background: transparent;
          border: 1px solid #2a2a30;
          color: #8a8a8f;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .restart-btn:hover {
          color: #e8e6e3;
          border-color: #3a3a42;
        }
        .divider {
          border: none;
          border-top: 1px solid #2a2a30;
        }
        .glow-border {
          background: #121214;
          border: 1px solid #2a2a30;
          border-radius: 12px;
        }
      `}</style>

      <div className="max-w-xl mx-auto px-6 py-12">
        {/* Result header */}
        <div className="text-center mb-8">
          <div className="rune-symbol mb-4">{result.symbol}</div>
          <h2 className="text-2xl tracking-wider text-[#e8e6e3] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {result.name}
          </h2>
          <p className="text-sm text-[#5a5a60] tracking-widest font-display" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {result.source} · {result.method} · {result.cost}
          </p>
        </div>

        <hr className="divider my-8" />

        {/* Description */}
        <div className="glow-border p-6 mb-8">
          <p className="text-[#e8e6e3] text-base leading-relaxed" style={{ fontFamily: 'Noto Serif SC, serif' }}>
            {result.description}
          </p>
          <p className="text-sm text-[#5a5a60] mt-4 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            典型特征：{result.example}
          </p>
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="stat-card">
            <div className="stat-label">来源</div>
            <div className="stat-value">{formatScores(result.scores.src)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">方式</div>
            <div className="stat-value">{formatScores(result.scores.met)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">代价</div>
            <div className="stat-value">{formatScores(result.scores.cst)}</div>
          </div>
        </div>

        {/* Restart and Share buttons */}
        <div className="text-center flex gap-4 justify-center">
          <button onClick={handleRestart} className="restart-btn">
            重新测算
          </button>
          <ShareButton result={result} />
        </div>
      </div>
    </div>
  )
}