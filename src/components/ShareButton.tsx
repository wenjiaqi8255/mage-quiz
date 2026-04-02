import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import type { Result } from '../utils/calculateResult'
import ShareCard from './ShareCard'

interface ShareButtonProps {
  result: Result
}

export default function ShareButton({ result }: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const shareCardRef = useRef<HTMLDivElement>(null)

  const generateImage = async () => {
    const element = shareCardRef.current
    if (!element) return

    setIsGenerating(true)

    try {
      // Clone the element for html2canvas capture
      const clone = element.cloneNode(true) as HTMLElement
      clone.style.position = 'absolute'
      clone.style.opacity = '1'
      clone.style.visibility = 'visible'
      clone.style.left = '0'
      clone.style.top = '0'
      clone.style.height = 'auto'
      clone.style.minHeight = '580px'
      document.body.appendChild(clone)

      // Capture the cloned element
      const canvas = await html2canvas(clone, {
        scale: 2,
        backgroundColor: '#0a0a0b',
        useCORS: true,
        logging: false,
        windowHeight: clone.scrollHeight + 100,
      })
      document.body.removeChild(clone)

      const dataUrl = canvas.toDataURL('image/png')
      setPreviewImage(dataUrl)
      setIsGenerating(false)
    } catch (error) {
      console.error('Failed to generate share image:', error)
      setIsGenerating(false)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
    generateImage()
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setPreviewImage(null)
  }

  const downloadImage = () => {
    if (!previewImage) return
    const link = document.createElement('a')
    link.download = `mage-${result.name}.png`
    link.href = previewImage
    link.click()
  }

  return (
    <>
      {/* Hidden share card for image generation */}
      <ShareCard result={result} ref={shareCardRef} />

      {/* Share button */}
      <button
        onClick={openModal}
        className="restart-btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16,6 12,2 8,6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        分享结果
      </button>

      {/* Preview modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: '#0a0a0b',
              border: '1px solid #2a2a30',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '20px',
                  letterSpacing: '0.05em',
                  color: '#e8e6e3',
                  margin: '0',
                }}
              >
                分享图片预览
              </h3>
              <button
                onClick={closeModal}
                style={{
                  background: 'transparent',
                  border: '1px solid #2a2a30',
                  color: '#8a8a8f',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}
              >
                ×
              </button>
            </div>

            {/* Preview image */}
            <div
              style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '300px',
                alignItems: 'center',
              }}
            >
              {isGenerating ? (
                <p style={{ color: '#5a5a60', fontFamily: "'Cormorant Garamond', serif" }}>
                  生成中...
                </p>
              ) : previewImage ? (
                <img
                  src={previewImage}
                  alt="Share preview"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  }}
                />
              ) : (
                <p style={{ color: '#5a5a60', fontFamily: "'Cormorant Garamond', serif" }}>
                  生成失败，请重试
                </p>
              )}
            </div>

            {/* Download button */}
            {previewImage && (
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={downloadImage}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    background: 'linear-gradient(135deg, #c9a962, #d4b978, #8a7642)',
                    border: 'none',
                    color: '#0a0a0b',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  下载图片
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
