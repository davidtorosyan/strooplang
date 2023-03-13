<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import type { Color, StimulusResponse, Stimulus } from '@/data/types';
import { colorRecords } from '@/data/colors';
import { colorSet } from '@/data/sets';
import { useExamSettingsStore } from '@/stores/examSettings'
import { useExamHistoryStore } from '@/stores/examHistory'
import { random, randomColor } from '@/utils/rand';
import { Timer } from '@/utils/timer';

const examSettings = useExamSettingsStore()
const examLength = 5

const examHistory = useExamHistoryStore()

const runningExam = ref(false)
const stimuli: Ref<Stimulus[]> = ref([])
const responses: Ref<StimulusResponse[]> = ref([])
const index = ref(0)

const stimulus = computed(() => stimuli.value[index.value])
const hex = computed(() => runningExam.value ? colorRecords[stimulus.value.visual].hex : '')
const name = computed(() => runningExam.value ? colorRecords[stimulus.value.lexical].names[examSettings.lang] : '')

const timer = new Timer()

function startExam() {
  stimuli.value = createStimuli()
  runningExam.value = true
  timer.reset()
}

function stopExam() {
  runningExam.value = false

  if (responses.value.length === examLength) {
    examHistory.publish(responses.value, examSettings.lang)
  }

  stimuli.value = []
  responses.value = []
  index.value = 0
}

function createStimulus(): Stimulus {
  const congruent = random(0, 1) === 1
  const visual = randomColor()
  const lexical = congruent ? visual : randomColor()
  return {
    visual,
    lexical,
    congruent,
  }
}

function createStimuli(): Stimulus[] {
  return Array.from({ length: examLength }, createStimulus);
}

function respond(color: Color) {
  responses.value.push({
    index: index.value,
    stimulus: stimulus.value,
    guess: color,
    durationMs: timer.elapsedMs(),
    correct: stimulus.value.visual === color,
  })
  index.value++
  timer.reset()

  if (index.value === stimuli.value.length) {
    stopExam()
  }
}

</script>

<template>
  <h3>
    Exam
  </h3>
  <div v-if="runningExam">
    <button @click="stopExam">Stop</button>
  </div>
  <div v-else>
    <button @click="startExam">Start</button>
  </div>
  <div :class="['stage', { disabled: !runningExam }]">
    <span v-if="runningExam" class="word">{{ name }}</span>
  </div>
  <div class="controls">
    <button :disabled="!runningExam" @click="respond(choice)" :style="`background-color: ${colorRecords[choice].hex};`"
      v-for="choice in colorSet" :key="choice">
      {{ choice }}
    </button>
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
  width: 600px;
  height: 300px;
}

.stage.disabled {
  background-color: grey;
  font-size: 0px;
}

.stage.disabled .word {
  font-size: 0px;
}

.controls>button {
  border: none;
  min-width: 100px;
  min-height: 100px;
  font-size: 0;
  margin: 10px;
}
</style>