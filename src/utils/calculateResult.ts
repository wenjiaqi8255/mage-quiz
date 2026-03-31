import { archetypes } from '../data/quizConfig'

export interface Result {
  name: string
  symbol: string
  description: string
  source: string
  method: string
  cost: string
  example: string
  scores: {
    src: Record<string, number>
    met: Record<string, number>
    cst: Record<string, number>
  }
}

interface Answers {
  src: (string | null)[]
  met: (string | null)[]
  cst: (string | null)[]
}

function getTop(scores: Record<string, number>): string {
  const entries = Object.entries(scores).filter(([, v]) => v > 0)
  if (entries.length === 0) return ''
  entries.sort((a, b) => b[1] - a[1])
  return entries[0][0]
}

export function calculateResult(answers: Answers): Result {
  // Calculate scores for each dimension
  const srcScores: Record<string, number> = { 界域: 0, 宗主: 0, 自我: 0 }
  const metScores: Record<string, number> = { 律式: 0, 契约: 0, 意志: 0 }
  const cstScores: Record<string, number> = { 心神: 0, 因果: 0, 介质: 0 }

  // Source (维度 0-2)
  answers.src.forEach((val) => {
    if (val) srcScores[val]++
  })

  // Method (维度 3-5)
  answers.met.forEach((val) => {
    if (val) metScores[val]++
  })

  // Cost (维度 6-8)
  answers.cst.forEach((val) => {
    if (val) cstScores[val]++
  })

  const topSrc = getTop(srcScores)
  const topMet = getTop(metScores)
  const topCst = getTop(cstScores)

  // Build key using JSON format: {source}-{method}-{cost}
  const key = `${topSrc}-${topMet}-${topCst}`
  const archetype = archetypes[key]

  // Fallback result if not found
  const fallback: Result = {
    name: '多元法师',
    symbol: '⊕',
    description: '你的法力属性难以归入单一流派——多种力量在你身上交织，这往往是最强大也最难驾驭的类型。',
    source: topSrc,
    method: topMet,
    cost: topCst,
    example: '多维度施法者',
    scores: { src: srcScores, met: metScores, cst: cstScores }
  }

  if (!archetype) return fallback

  // Derive source/method/cost from the key (format: {source}-{method}-{cost})
  const [archSource, archMethod, archCost] = key.split('-')

  return {
    name: archetype.name,
    symbol: archetype.rune,
    description: archetype.description,
    source: archSource,
    method: archMethod,
    cost: archCost,
    example: archetype.examples.join('、'),
    scores: { src: srcScores, met: metScores, cst: cstScores }
  }
}