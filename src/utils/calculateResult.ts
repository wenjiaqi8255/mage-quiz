import { archetypes } from '../data/archetypes'

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

  // Build key and find archetype
  const key = `${topSrc}-${topMet}-${topCst}`
  const archetype = archetypes.find(a => {
    // Map archetype names to the key format
    const nameMap: Record<string, string> = {
      '烈焰编织者': '自我-意志-介质',
      '烈焰': '自我-意志-介质',
      '学源法师': '界域-律式-心神',
      '窥天术士': '界域-律式-因果',
      '炼金术士': '界域-律式-介质',
      '自然巫师': '界域-契约-心神',
      '自然守护者': '界域-契约-因果',
      '巫医通灵者': '界域-契约-介质',
      '天人合一者': '界域-意志-心神',
      '命途行者': '界域-意志-因果',
      '自然化身': '界域-意志-介质',
      '神明使者': '宗主-律式-心神',
      '信仰之光': '宗主-律式-因果',
      '神器密法师': '宗主-律式-介质',
      '降神使者': '宗主-契约-心神',
      '神之使徒': '宗主-契约-因果',
      '法宝持有者': '宗主-契约-介质',
      '神谕先知': '宗主-意志-心神',
      '神仆存在': '宗主-意志-因果',
      '幻想具现者': '宗主-意志-介质',
      '魔力学者': '自我-律式-心神',
      '禁忌术士': '自我-律式-因果',
      '改造术师': '自我-律式-介质',
      '人格面具使': '自我-契约-心神',
      '命运承担者': '自我-契约-因果',
      '血约术士': '自我-契约-介质',
      '异能觉醒者': '自我-意志-心神',
      '超然存在': '自我-意志-因果',
      '神器骑士': '自我-意志-介质',
    }
    return nameMap[a.name] === key
  })

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

  return {
    name: archetype.name,
    symbol: archetype.symbol,
    description: archetype.description,
    source: archetype.source,
    method: archetype.method,
    cost: archetype.cost,
    example: archetype.traits.join('、'),
    scores: { src: srcScores, met: metScores, cst: cstScores }
  }
}