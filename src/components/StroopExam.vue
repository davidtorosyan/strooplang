<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import type { Color, GuessResult } from '@/data/types';
import { colorRecords } from '@/data/colors';
import { colorSet } from '@/data/sets';
import { useExamSettingsStore } from '@/stores/examSettings'
import { random, randomColor } from '@/utils/rand';
import { Timer } from '@/utils/timer';

const examSettings = useExamSettingsStore()

const visualColor: Ref<Color> = ref('red')
const lexicalColor: Ref<Color> = ref('red')

const hex = computed(() => colorRecords[visualColor.value].hex)
const name = computed(() => colorRecords[lexicalColor.value].names[examSettings.lang])

const guesses: Ref<GuessResult[]> = ref([])

const timer = new Timer()

function next() {
  const congruent = random(0, 1) === 1
  visualColor.value = randomColor()
  lexicalColor.value = congruent ? visualColor.value : randomColor()
  timer.reset()
}

function guess(color: Color) {
  guesses.value.push({
    index: guesses.value.length,
    visual: visualColor.value,
    lexical: lexicalColor.value,
    guess: color,
    durationMs: timer.elapsedMs(),
    correct: visualColor.value === color,
    congruent: visualColor.value === lexicalColor.value,
  })
  next()
}

</script>

<template>
  <h3>
    Exam
  </h3>
  <div class="stage">
    <span class="word">{{ name }}</span>
  </div>
  <div>
    <button @click="next">next</button>
  </div>
  <div class="controls">
    <button @click="guess(choice)" :style="`background-color: ${colorRecords[choice].hex};`" v-for="choice in colorSet"
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
        <th>Duration</th>
        <th>Correct</th>
        <th>Congruent</th>
      </tr>
      <tr v-for="guess in guesses" :key="guess.index">
        <td>{{ guess.visual }}</td>
        <td>{{ guess.lexical }}</td>
        <td>{{ guess.guess }}</td>
        <td>{{ guess.durationMs }} milliseconds</td>
        <td>{{ guess.correct }}</td>
        <td>{{ guess.congruent }}</td>
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