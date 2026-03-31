export interface Question {
  id: number
  text: string
  dimension: 'src' | 'met' | 'cst'
  options: Option[]
}

export interface Option {
  value: string
  label: string
}

export const questions: Question[] = [
  // 来源 (Source) - 3 questions
  {
    id: 0,
    text: "你站在一座古老图书馆的入口。馆内据说藏有能改变世界的秘密。你会怎么做？",
    dimension: 'src',
    options: [
      { value: '界域', label: '找到最古老的典籍，从头系统地研读——宇宙的规律一定有迹可循' },
      { value: '宗主', label: '去找守馆的老者，与他建立信任，请他指引我该读什么' },
      { value: '自我', label: '闭上眼，感受哪一排书架在召唤我——我的直觉不会错' }
    ]
  },
  {
    id: 1,
    text: "一个陌生人请求你传授法力。你会怎么判断是否答应？",
    dimension: 'src',
    options: [
      { value: '界域', label: '看他是否愿意从基础学起，是否真的理解世界运转的规律' },
      { value: '宗主', label: '取决于我背后的力量是否愿意接纳他——这不完全由我决定' },
      { value: '自我', label: '感受他的内心——力量是内生的，我能教的不过是唤醒方式' }
    ]
  },
  {
    id: 2,
    text: "如果可以选择，你最理想的修炼场所是？",
    dimension: 'src',
    options: [
      { value: '界域', label: '深山或海边——越接近原始的自然力，越容易感知到能量流动' },
      { value: '宗主', label: '某个古老的圣所或神殿——那里有与更高存在沟通的通道' },
      { value: '自我', label: '任何我独处的地方——外部环境不重要，关键在于向内挖掘' }
    ]
  },

  // 方式 (Method) - 3 questions
  {
    id: 3,
    text: "你的法术失败了，炸伤了自己。你怎么理解这次失败？",
    dimension: 'met',
    options: [
      { value: '律式', label: '一定是某个步骤的顺序或参数出了错，我需要重新推导公式' },
      { value: '契约', label: '我与那股力量的沟通出现了误解，需要重新谈判条件' },
      { value: '意志', label: '我的意志不够坚定，杂念太多，下次要在更纯粹的状态下尝试' }
    ]
  },
  {
    id: 4,
    text: "你遇到了一道从未见过的封印。你的第一反应是？",
    dimension: 'met',
    options: [
      { value: '律式', label: '分析封印的构造，找到其底层逻辑，用对应的破解式拆解' },
      { value: '契约', label: '尝试与封印背后的存在对话，搞清楚谁设下它以及条件是什么' },
      { value: '意志', label: '凝聚全部意志，直接对抗——如果信念够强，封印就会碎' }
    ]
  },
  {
    id: 5,
    text: "同伴问你：「你的魔法，到底遵循什么规则？」你会怎么回答？",
    dimension: 'met',
    options: [
      { value: '律式', label: '「有一套体系，我可以解释给你听。」' },
      { value: '契约', label: '「我不独自使用魔法——背后有协议，有条件，有对等的关系。」' },
      { value: '意志', label: '「没有规则。只要我相信它会发生，它就会发生。」' }
    ]
  },

  // 代价 (Cost) - 3 questions
  {
    id: 6,
    text: "施展一次极强的魔法之后，你感到：",
    dimension: 'cst',
    options: [
      { value: '心神', label: '脑子里一片空白，精神力被榨干，需要长时间休息' },
      { value: '因果', label: '隐约感到自己与某个命运的节点错位了，未来有什么将会改变' },
      { value: '介质', label: '某件随身之物消耗殆尽，或者身体上留下了一道不会痊愈的印记' }
    ]
  },
  {
    id: 7,
    text: "完成一次重要任务后，你发现代价比预期的大。此刻你想到的是：",
    dimension: 'cst',
    options: [
      { value: '心神', label: '我的精神储量已经见底，这种消耗不可持续，需要找到恢复的方法' },
      { value: '因果', label: '我欠下了一笔因果债，日后某处会有代价来收——只是不知道以何种形式' },
      { value: '介质', label: '那些材料和媒介都是有限的，我必须更谨慎地规划下一次消耗' }
    ]
  },
  {
    id: 8,
    text: "一位老法师告诉你：「真正的力量，必须有所放弃。」你会放弃什么？",
    dimension: 'cst',
    options: [
      { value: '心神', label: '时间与精力——我愿意用毕生的专注去换取深度' },
      { value: '因果', label: '某种可能性或自由——力量越大，命运的轨道就越窄' },
      { value: '介质', label: '某些珍贵的事物或身体的一部分——有形的代价最为诚实' }
    ]
  }
]

export type Dimension = 'src' | 'met' | 'cst'

export const dimensionLabels: Record<Dimension, string> = {
  src: '来源',
  met: '方式',
  cst: '代价'
}