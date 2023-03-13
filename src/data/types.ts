export type Color = 'red' | 'blue' | 'green' | 'brown' | 'purple'

export type Lang = 'en' | 'ru' | 'zh' | 'es' | 'am'

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
  dateMs: number
  responses: StimulusResponse[]
  lang: Lang
}

export interface TestStats {
  responseCount: number
  validCount: number
  congruentMeanDurationMs: number
  incongruentMeanDurationMs: number
  deltaMs: number
  deltaPercent: number
}

export interface TestResultInfo extends TestResult {
  stats: TestStats | undefined
}