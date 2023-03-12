export type Color = 'red' | 'blue' | 'green' | 'brown' | 'purple'
export type Lang = 'en' | 'ru'

export const chosenColors: readonly Color[] = [
  'red',
  'blue',
  'green',
  'brown',
  'purple',
]

export const chosenLangs: readonly Lang[] = [
  'en',
  'ru',
]

export interface ColorInfo {
  hex: string
  names: Record<Lang, string>
}

export const languages: Record<Lang, string> = {
  'en': 'English',
  'ru': 'Russian',
}

export const colors: Record<Color, ColorInfo> = {
  'red': {
    hex: '#d12626',
    names: {
      'en': 'red',
      'ru': 'кра́сный',
    },
  },
  'blue': {
    hex: '#268ad1',
    names: {
      'en': 'blue',
      'ru': 'голубо́й',
    },
  },
  'green': {
    hex: '#26d14b',
    names: {
      'en': 'green',
      'ru': 'зелёный',
    },
  },
  'brown': {
    hex: '#a34a12',
    names: {
      'en': 'brown',
      'ru': 'кори́чневый',
    },
  },
  'purple': {
    hex: '#a1189c',
    names: {
      'en': 'purple',
      'ru': 'фиоле́товый',
    },
  },
}