import { forwardRef } from 'react'
import type { Result } from '../utils/calculateResult'

interface ShareCardProps {
  result: Result
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ result }, ref) => {
  const formatScores = (scores: Record<string, number>) => {
    return Object.entries(scores)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k}×${v}`)
      .join(' ') || '—'
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '0',
        width: '400px',
        minHeight: '580px',
        height: 'auto',
        background: '#0a0a0b',
        fontFamily: "'Noto Serif SC', serif",
        padding: '40px 30px 50px 30px',
        boxSizing: 'border-box',
        visibility: 'visible',
        overflow: 'visible',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '64px',
            color: '#c9a962',
            filter: 'drop-shadow(0 0 30px rgba(201, 169, 98, 0.4))',
            marginBottom: '16px',
          }}
        >
          {result.symbol}
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px',
            letterSpacing: '0.05em',
            color: '#e8e6e3',
            margin: '0 0 8px 0',
          }}
        >
          {result.name}
        </h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: '#5a5a60',
            margin: '0',
          }}
        >
          {result.source} · {result.method} · {result.cost}
        </p>
      </div>

      {/* Divider */}
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #2a2a30',
          margin: '24px 0',
        }}
      />

      {/* Description */}
      <div
        style={{
          background: '#121214',
          border: '1px solid #2a2a30',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
        }}
      >
        <p
          style={{
            color: '#e8e6e3',
            fontSize: '14px',
            lineHeight: '1.7',
            margin: '0 0 12px 0',
          }}
        >
          {result.description}
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '12px',
            color: '#5a5a60',
            fontStyle: 'italic',
            margin: '0',
          }}
        >
          典型特征：{result.example}
        </p>
      </div>

      {/* Score breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <div
          style={{
            background: '#1a1a1d',
            border: '1px solid #2a2a30',
            borderRadius: '8px',
            padding: '14px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: '#5a5a60',
              marginBottom: '4px',
            }}
          >
            来源
          </div>
          <div style={{ fontSize: '14px', color: '#e8e6e3' }}>
            {formatScores(result.scores.src)}
          </div>
        </div>
        <div
          style={{
            background: '#1a1a1d',
            border: '1px solid #2a2a30',
            borderRadius: '8px',
            padding: '14px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: '#5a5a60',
              marginBottom: '4px',
            }}
          >
            方式
          </div>
          <div style={{ fontSize: '14px', color: '#e8e6e3' }}>
            {formatScores(result.scores.met)}
          </div>
        </div>
        <div
          style={{
            background: '#1a1a1d',
            border: '1px solid #2a2a30',
            borderRadius: '8px',
            padding: '14px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: '#5a5a60',
              marginBottom: '4px',
            }}
          >
            代价
          </div>
          <div style={{ fontSize: '14px', color: '#e8e6e3' }}>
            {formatScores(result.scores.cst)}
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '30px',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: '#3a3a42',
        }}
      >
        MAGE 法师流派测算
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'

export default ShareCard
