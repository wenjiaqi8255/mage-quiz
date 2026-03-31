// Type definitions for mage_quiz_config.json
// This file provides type-safe access to the JSON quiz configuration

// Dimension type
export type Dimension = 'source' | 'method' | 'cost'

// Option within a dimension
export interface DimensionOption {
  label: string
  description: string
  keywords: string[]
}

// Dimension configuration
export interface DimensionConfig {
  id: Dimension
  label: string
  question_count: number
  description: string
  design_note: string
  options: Record<string, DimensionOption>
}

// Question option
export interface QuestionOption {
  id: string
  text: string
  value: string
}

// Question in the quiz
export interface Question {
  id: string
  dimension: Dimension
  index_in_dimension: number
  design_angle: string
  text: string
  options: QuestionOption[]
}

// Scoring configuration
export interface ScoringConfig {
  method: string
  tiebreaker: string
  tiebreaker_explanation: string
  result_key_format: string
  result_key_example: string
  dimension_order: Dimension[]
}

// Archetype in the quiz
export interface Archetype {
  name: string
  rune: string
  description: string
  examples: string[]
  tags: string[]
  source: string
  method: string
  cost: string
}

// Meta information
export interface QuizMeta {
  name: string
  version: string
  description: string
  author_note: string
  scoring_method: string
  scoring_explanation: string
  total_questions: number
  total_archetypes: number
}

// Full quiz configuration
export interface QuizConfig {
  _meta: QuizMeta
  dimensions: {
    source: DimensionConfig
    method: DimensionConfig
    cost: DimensionConfig
  }
  questions: Question[]
  scoring: ScoringConfig
  archetypes: Record<string, Archetype>
}

// Import the JSON data
import config from '../../mage_quiz_config.json'

// Re-export typed data from JSON
export const questions: Question[] = config.questions
export const dimensions = config.dimensions
export const scoring = config.scoring
export const meta: QuizMeta = config._meta
export const archetypes: Record<string, Archetype> = config.archetypes

// Type assertion for the config import
const _config: QuizConfig = config