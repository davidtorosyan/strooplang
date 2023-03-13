export type Color = 'red' | 'blue' | 'green' | 'brown' | 'purple'

export type Lang = 'en' | 'ru'

export interface ColorInfo {
  hex: string
  names: Record<Lang, string>
}

export interface LangInfo {
  name: string
}

export interface Stimulus {
  visual: Color
  lexical: Color
  congruent: boolean
}

export interface StimulusResponse {
  index: number
  stimulus: Stimulus
  guess: Color
  durationMs: number
  correct: boolean
}

export interface TestResult {
  index: number
  responses: StimulusResponse[]
}