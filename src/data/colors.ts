import type { Color, ColorInfo, Lang, LangInfo } from "./types"

export const langRecords: Record<Lang, LangInfo> = {
  'en': { name: 'English' },
  'ru': { name: 'Russian' },
}

export const colorRecords: Record<Color, ColorInfo> = {
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