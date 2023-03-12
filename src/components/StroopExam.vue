<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

import { colors, languages, chosenColors, chosenLangs } from './colors'
import type { Color, Lang } from './colors'

const lang: Ref<Lang> = ref('en')
const visualColor: Ref<Color> = ref('red')
const lexicalColor: Ref<Color> = ref('red')

interface GuessResult {
  index: number
  visual: Color
  lexical: Color
  guess: Color
}

const hex = computed(() => colors[visualColor.value].hex)
const name = computed(() => colors[lexicalColor.value].names[lang.value])

const guesses: Ref<GuessResult[]> = ref([])

function random(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomColor(except?: Color): Color {
  let index
  if (except) {
    const exceptIndex = chosenColors.indexOf(except)
    const randIndex = random(0, chosenColors.length - 2)
    index = randIndex + (randIndex >= exceptIndex ? 1 : 0)

  } else {
    index = random(0, chosenColors.length - 1)
  }
  return chosenColors[index]
}

function next() {
  const congruent = random(0, 1) === 1
  visualColor.value = randomColor()
  lexicalColor.value = congruent ? visualColor.value : randomColor()
}

const langOptions = ref(chosenLangs.map((choice) => ({
  text: languages[choice],
  value: choice
})))

function guess(color: Color) {
  guesses.value.push({
    index: guesses.value.length,
    visual: visualColor.value,
    lexical: lexicalColor.value,
    guess: color
  })
  next()
}

</script>

<template>
  <div class="stage">
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
  <div class="controls">
    <button @click="guess(choice)" :style="`background-color: ${colors[choice].hex};`" v-for="choice in chosenColors"
      :key="choice">
      {{ choice }}
    </button>
  </div>
  <div class="guesses">
    <table>
      <tr>
        <th>Visual Color</th>
        <th>Written Color</th>
        <th>Guess</th>
      </tr>
      <tr v-for="guess in guesses" :key="guess.index">
        <td>{{ guess.visual }}</td>
        <td>{{ guess.lexical }}</td>
        <td>{{ guess.guess }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.word {
  font-weight: 500;
  font-size: 3rem;
  color: v-bind('hex')
}

.stage {
  border-color: black;
  border-width: 5px;
  border-style: solid;
  text-align: center;
  background-color: beige;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.controls>button {
  border: none;
  min-width: 100px;
  min-height: 100px;
  font-size: 0;
  margin: 10px;
}
</style>