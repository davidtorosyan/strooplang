import type { Color, ColorInfo, Lang, LangInfo } from "./types"

export const langRecords: Record<Lang, LangInfo> = {
  'en': { name: 'English' },
  'ru': { name: 'Russian' },
  'zh': { name: 'Chinese' },
  'es': { name: 'Spanish' },
  'am': { name: 'Armenian' },
}

export const colorRecords: Record<Color, ColorInfo> = {
  'red': {
    hex: '#d12626',
    names: {
      'en': 'red',
      'ru': 'кра́сный',
      'zh': '红色',
      'es': 'rojo',
      'am': 'կարմիր',
    },
  },
  'blue': {
    hex: '#268ad1',
    names: {
      'en': 'blue',
      'ru': 'голубо́й',
      'zh': '蓝色',
      'es': 'azul',
      'am': 'կապույտ',
    },
  },
  'green': {
    hex: '#26d14b',
    names: {
      'en': 'green',
      'ru': 'зелёный',
      'zh': '绿色',
      'es': 'verde',
      'am': 'կանաչ',
    },
  },
  'brown': {
    hex: '#a34a12',
    names: {
      'en': 'brown',
      'ru': 'кори́чневый',
      'zh': '褐色',
      'es': 'marrón',
      'am': 'շագանակագույն',
    },
  },
  'purple': {
    hex: '#a1189c',
    names: {
      'en': 'purple',
      'ru': 'фиоле́товый',
      'zh': '紫色',
      'es': 'morado',
      'am': 'մանուշակագույն',
    },
  },
}