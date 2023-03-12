<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

type Color = 'red' | 'blue' | 'green' | 'brown' | 'purple'
type Lang = 'en' | 'ru'

interface ColorInfo {
  hex: string
  names: Record<Lang, string>
}

const chosenColors: readonly Color[] = [
  'red',
  'blue',
  'green',
  'brown',
  'purple',
]

const chosenLangs: readonly Lang[] = [
  'en',
  'ru',
]

const languages: Record<Lang, string> = {
  'en': 'English',
  'ru': 'Russian',
}

const colors: Record<Color, ColorInfo> = {
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

const lang: Ref<Lang> = ref('en')
const color: Ref<Color> = ref('red')

const hex = computed(() => colors[color.value].hex)
const name = computed(() => colors[color.value].names[lang.value])

function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function next() {
  const index = random(0, chosenColors.length - 1)
  color.value = chosenColors[index]
}

const langOptions = ref(chosenLangs.map((choice) => ({
  text: languages[choice],
  value: choice
})))

</script>

<template>
  <div>
    <span class="word">{{ name }}</span>
  </div>
  <div>
    <button @click="next">next</button>
  </div>
  <div>
    <select v-model="lang">
      <option v-for="option in langOptions" :value="option.value" :key="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.word {
  color: v-bind('hex')
}
</style>