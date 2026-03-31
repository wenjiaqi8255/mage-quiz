export interface Archetype {
  id: string
  name: string
  symbol: string
  description: string
  source: string    // 力量来源
  method: string    // 施法方式
  cost: string      // 代价
  personality: string[]
  traits: string[]
}

export const archetypes: Archetype[] = [
  // === 元素法师 (Elemental Mages) ===
  {
    id: 'flameweaver', name: '烈焰编织者', symbol: '🔥',
    description: '你与火焰元素有着天然的亲和力，能够将愤怒的火焰化为致命的魔法。',
    source: '元素之力', method: '咒语咏唱', cost: '生命力',
    personality: ['热情', '冲动', '直接'],
    traits: ['高温灼烧', '范围攻击', '爆发']
  },
  {
    id: 'frostwarden', name: '冰霜守护者', symbol: '❄️',
    description: '你掌握着冰冷的力量，能够冻结时间与敌人。',
    source: '元素之力', method: '符文刻画', cost: '情感',
    personality: ['冷静', '耐心', '内敛'],
    traits: ['冰冻控制', '防御护盾', '持久']
  },
  {
    id: 'stormcaller', name: '风暴呼唤者', symbol: '⚡',
    description: '你能够召唤雷电与风暴，是天气的掌控者。',
    source: '元素之力', method: '手势引导', cost: '精神力',
    personality: ['果断', '自由', '不稳定'],
    traits: ['闪电攻击', '范围控制', '高机动']
  },
  {
    id: 'earthmender', name: '大地修补者', symbol: '🪨',
    description: '你与大地母亲保持连接，能够操控岩石与植物。',
    source: '元素之力', method: '图腾仪式', cost: '时间',
    personality: ['沉稳', '固执', '务实'],
    traits: ['物理防御', '召唤傀儡', '地形改造']
  },

  // === 奥术法师 (Arcane Mages) ===
  {
    id: 'chronomancer', name: '时空术士', symbol: '⏳',
    description: '你能够扭曲时间与空间的法则，是禁忌魔法的大师。',
    source: '星界能量', method: '符文刻画', cost: '记忆',
    personality: ['神秘', '孤僻', '哲学'],
    traits: ['时间倒流', '空间传送', '预知']
  },
  {
    id: 'illusionist', name: '幻象大师', symbol: '🎭',
    description: '你精通欺骗与幻觉的艺术，让现实为你改变。',
    source: '星界能量', method: '咒语咏唱', cost: '认知',
    personality: ['狡黠', '创意', '善变'],
    traits: ['幻觉制造', '隐身', '心智操控']
  },
  {
    id: 'enchanter', name: '附魔师', symbol: '✨',
    description: '你能够将魔法注入物品，创造强大的魔法道具。',
    source: '星界能量', method: '符文刻画', cost: '专注力',
    personality: ['细致', '完美主义', '传统'],
    traits: ['物品强化', '魔法铭文', '持久效果']
  },
  {
    id: 'necromancer', name: '亡灵法师', symbol: '💀',
    description: '你敢于与死亡为伍，操控亡者与灵魂的力量。',
    source: '星界能量', method: '仪式献祭', cost: '灵魂',
    personality: ['冷酷', '计算', '野心'],
    traits: ['召唤亡灵', '生命吸取', '灵魂绑定']
  },

  // === 自然法师 (Nature Mages) ===
  {
    id: 'druid', name: '德鲁伊', symbol: '🌿',
    description: '你与自然万物心灵相通，是生态的守护者。',
    source: '自然之力', method: '图腾仪式', cost: '生命力',
    personality: ['和平', '传统', '神秘'],
    traits: ['治愈术', '动物伙伴', '变形术']
  },
  {
    id: 'beastmaster', name: '兽王', symbol: '🐺',
    description: '你与野兽有着特殊的纽带，能够指挥它们战斗。',
    source: '自然之力', method: '手势引导', cost: '情感',
    personality: ['原始', '直觉', '领袖'],
    traits: ['动物伙伴', '野性召唤', '感官强化']
  },
  {
    id: 'verdant', name: '翠绿行者', symbol: '🍃',
    description: '你能够操控植物的生长，是森林的化身。',
    source: '自然之力', method: '仪式献祭', cost: '时间',
    personality: ['温和', '耐心', '成长导向'],
    traits: ['植物操控', '毒性攻击', '自然愈合']
  },
  {
    id: 'tidewarden', name: '潮汐守护者', symbol: '🌊',
    description: '你掌控着潮汐与水流，是海洋的代言人。',
    source: '自然之力', method: '图腾仪式', cost: '精神力',
    personality: ['流动', '适应', '深邃'],
    traits: ['水系魔法', '治愈之潮', '海洋召唤']
  },

  // === 精神法师 (Psychic Mages) ===
  {
    id: 'telepath', name: '读心者', symbol: '🧠',
    description: '你能够读取他人思想，是心灵的大师。',
    source: '精神之力', method: '冥想觉醒', cost: '精神力',
    personality: ['敏感', '洞察', '内省'],
    traits: ['读心术', '情感感知', '心智防护']
  },
  {
    id: 'psion', name: '灵能者', symbol: '🔮',
    description: '你能够以纯粹的意志力影响现实。',
    source: '精神之力', method: '冥想觉醒', cost: '认知',
    personality: ['自律', '理性', '独立'],
    traits: ['念力操控', '心灵感应', '能量释放']
  },
  {
    id: 'seer', name: '先知', symbol: '👁️',
    description: '你能够预见未来，是命运的揭示者。',
    source: '精神之力', method: '冥想觉醒', cost: '记忆',
    personality: ['神秘', '超然', '使命感'],
    traits: ['预知未来', '命运感知', '启示']
  },
  {
    id: 'mindbreaker', name: '心碎者', symbol: '💔',
    description: '你能够摧毁敌人的心智，是精神战争的大师。',
    source: '精神之力', method: '仪式献祭', cost: '灵魂',
    personality: ['黑暗', '操控', '精算'],
    traits: ['心智攻击', '恐惧植入', '意识操控']
  },

  // === 光明法师 (Light Mages) ===
  {
    id: 'luminous', name: '光辉使者', symbol: '☀️',
    description: '你承载着光明与希望，是黑暗的克星。',
    source: '光明之力', method: '仪式献祭', cost: '生命力',
    personality: ['正义', '牺牲', '领袖'],
    traits: ['神圣之光', '治愈术', '驱邪']
  },
  {
    id: 'healer', name: '治愈者', symbol: '💚',
    description: '你拥有治愈一切的力量，是生命的守护者。',
    source: '光明之力', method: '图腾仪式', cost: '情感',
    personality: ['温柔', '关怀', '无私'],
    traits: ['群体治愈', '净化术', '生命祝福']
  },
  {
    id: 'aurora', name: '极光舞者', symbol: '🌌',
    description: '你能够操控光与色彩的魔法，是美的创造者。',
    source: '光明之力', method: '咒语咏唱', cost: '专注力',
    personality: ['艺术', '浪漫', '创造'],
    traits: ['光系攻击', '幻彩迷惑', '光环加持']
  },
  {
    id: 'warden', name: '守护者', symbol: '🛡️',
    description: '你是坚定的防护者，能够创造无敌的防御。',
    source: '光明之力', method: '符文刻画', cost: '精神力',
    personality: ['可靠', '坚韧', '责任'],
    traits: ['绝对防御', '祝福护盾', '结界']
  },

  // === 暗影法师 (Shadow Mages) ===
  {
    id: 'shadowmancer', name: '暗影大师', symbol: '🌑',
    description: '你能够在黑暗中行动，是暗影的化身。',
    source: '暗影之力', method: '手势引导', cost: '情感',
    personality: ['隐秘', '耐心', '机会主义'],
    traits: ['隐身潜行', '暗影攻击', '陷阱']
  },
  {
    id: 'shadowblade', name: '暗影利刃', symbol: '🗡️',
    description: '你是暗影与武器的结合，是无形的杀手。',
    source: '暗影之力', method: '仪式献祭', cost: '灵魂',
    personality: ['冷酷', '精准', '荣誉'],
    traits: ['暗影刺杀', '武器附魔', '瞬移']
  },
  {
    id: 'voidwalker', name: '虚空行者', symbol: '🕳️',
    description: '你能够穿梭于虚空之中，是空间裂隙的掌控者。',
    source: '暗影之力', method: '符文刻画', cost: '认知',
    personality: ['超然', '不安', '探索'],
    traits: ['虚空传送', '消融', '虚化']
  },
  {
    id: 'corruptor', name: '腐化者', symbol: '☠️',
    description: '你能够腐蚀一切，是毁灭的使者。',
    source: '暗影之力', method: '仪式献祭', cost: '生命力',
    personality: ['破坏', '混乱', '极端'],
    traits: ['腐蚀攻击', '疾病传播', '衰败']
  },

  // === 混合法师 (Hybrid Mages) ===
  {
    id: 'arcanist', name: '奥术师', symbol: '📚',
    description: '你是纯粹的魔法学习者，掌握多种学派。',
    source: '星界能量', method: '咒语咏唱', cost: '专注力',
    personality: ['好奇', '学术', '开放'],
    traits: ['多元素掌握', '法阵研究', '知识就是力量']
  },
  {
    id: 'elementalist', name: '元素使', symbol: '⚗️',
    description: '你是元素平衡的大师，能够融合不同元素。',
    source: '元素之力', method: '图腾仪式', cost: '时间',
    personality: ['平衡', '战略', '洞察'],
    traits: ['元素融合', '复合魔法', '环境操控']
  },
  {
    id: 'weaversong', name: '织歌者', symbol: '🎵',
    description: '你用音乐施法，是魔法与艺术的完美结合。',
    source: '精神之力', method: '咒语咏唱', cost: '精神力',
    personality: ['艺术', '表达', '情感丰富'],
    traits: ['音律攻击', '治愈之歌', '魅惑']
  },
  {
    id: 'runesmith', name: '符文铁匠', symbol: '⚒️',
    description: '你将魔法铭刻于金属，创造独特的魔法物品。',
    source: '星界能量', method: '符文刻画', cost: '时间',
    personality: ['工匠', '实用', '传承'],
    traits: ['武器附魔', '物品强化', '独特创造']
  }
]

export function getArchetypeById(id: string): Archetype | undefined {
  return archetypes.find(a => a.id === id)
}