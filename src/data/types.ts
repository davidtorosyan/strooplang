export type Color = 'red' | 'blue' | 'green' | 'brown' | 'purple'

export type Lang = 'en' | 'ru'

export interface ColorInfo {
  hex: string
  names: Record<Lang, string>
}

export interface LangInfo {
  name: string
}