import { useNavigate } from 'react-router-dom'

const runes = ['⟁', '◎', '⊕', '⌾', '⋈', '⌘', '◉', '∞', '❋', '✦', '☩', '⧖', '⊗', '☬', '✧', '◈', '∇', '◇', '⬡', '⟂', '⛭', '⦿', '⊘', '⊛', '★', '⊞', '⚔']

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0a0b' }}>
      {/* Background layers */}
      <div className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 92, 191, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 90%, rgba(201, 169, 98, 0.06) 0%, transparent 40%),
            radial-gradient(ellipse 50% 50% at 15% 70%, rgba(201, 169, 98, 0.04) 0%, transparent 35%),
            #0a0a0b`
        }}
      />

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'rgba(201, 169, 98, 0.4)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          50% { transform: translateY(-100px) translateX(20px); opacity: 0.3; }
          90% { opacity: 0.6; }
        }
        .title-gradient {
          background: linear-gradient(135deg, #e8e6e3 0%, #c9a962 50%, #d4b978 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-btn {
          background: linear-gradient(135deg, #c9a962, #8a7642);
          color: #0a0a0b;
          font-family: 'Cormorant Garamond', serif;
        }
        .cta-btn:hover {
          background: linear-gradient(135deg, #d4b978, #c9a962);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(201, 169, 98, 0.3);
        }
        .rune-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 40px rgba(201, 169, 98, 0.2);
        }
        .feature-card:hover {
          border-color: #3a3a42;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light mb-6 title-gradient" style={{ fontFamily: 'Noto Serif SC, serif' }}>
            法师流派测算
          </h1>
          <p className="text-lg text-[#8a8a8f] mb-8 font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            九问定流派 · 揭示你的魔法命运
          </p>
          <button
            onClick={() => navigate('/quiz')}
            className="cta-btn px-8 py-4 rounded-lg text-lg tracking-wider inline-flex items-center gap-3 transition-all duration-300 cursor-pointer"
          >
            <span>开始测算</span>
            <span>→</span>
          </button>
        </div>

        {/* Runes */}
        <div className="mb-16">
          <h2 className="text-center text-sm tracking-[0.3em] text-[#5a5a60] mb-8 font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            二十七种流派原型
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {runes.map((rune, i) => (
              <div
                key={i}
                className="rune-card w-12 h-12 flex items-center justify-center text-2xl rounded-lg cursor-default transition-all duration-300"
                style={{
                  background: 'rgba(26, 26, 29, 0.8)',
                  border: '1px solid #2a2a30',
                  color: '#c9a962',
                  textShadow: '0 0 20px rgba(201, 169, 98, 0.3)'
                }}
              >
                {rune}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div
            className="feature-card p-6 rounded-xl text-center transition-all duration-300"
            style={{ background: '#121214', border: '1px solid #2a2a30' }}
          >
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-[#e8e6e3] font-light mb-2" style={{ fontFamily: 'Noto Serif SC, serif' }}>知识探索</h3>
            <p className="text-sm text-[#5a5a60]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              从世界规律中汲取力量
            </p>
          </div>
          <div
            className="feature-card p-6 rounded-xl text-center transition-all duration-300"
            style={{ background: '#121214', border: '1px solid #2a2a30' }}
          >
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-[#e8e6e3] font-light mb-2" style={{ fontFamily: 'Noto Serif SC, serif' }}>契约之力</h3>
            <p className="text-sm text-[#5a5a60]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              与更高存在签订盟约
            </p>
          </div>
          <div
            className="feature-card p-6 rounded-xl text-center transition-all duration-300"
            style={{ background: '#121214', border: '1px solid #2a2a30' }}
          >
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-[#e8e6e3] font-light mb-2" style={{ fontFamily: 'Noto Serif SC, serif' }}>意志觉醒</h3>
            <p className="text-sm text-[#5a5a60]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              激发血脉中的天生之力
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-[#5a5a60]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          <p>© 2026 法师流派测算 · 由 AI 辅助设计</p>
        </div>
      </div>
    </div>
  )
}