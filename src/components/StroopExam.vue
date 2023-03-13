<script setup lang="ts">
import { computed } from 'vue'
import { colorRecords } from '@/data/colors';
import { colorSet } from '@/data/sets';
import { useExamSettingsStore } from '@/stores/examSettings'
import { useExamStateStore } from '@/stores/examState';
import ColorButtons from './ColorButtons.vue'

const examSettings = useExamSettingsStore()

const examState = useExamStateStore()

const stimulus = computed(() => examState.stimuli[examState.index])
const hex = computed(() => examState.running ? colorRecords[stimulus.value.visual].hex : '')
const name = computed(() => examState.running ? colorRecords[stimulus.value.lexical].names[examSettings.lang] : '')

</script>

<template>
  <h3>
    Exam
  </h3>
  <div v-if="examState.running">
    <button @click="examState.stop">Stop</button>
  </div>
  <div v-else>
    <button @click="examState.start">Start</button>
  </div>
  <div :class="['stage', { disabled: !examState.running }]">
    <span v-if="examState.running" class="word">{{ name }}</span>
  </div>
  <ColorButtons />
</template>

<style scoped>
.word {
  font-weight: 500;
  font-size: 3rem;
  color: v-bind('hex');
}

.stage {
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: black;
  border-width: 5px;
  border-style: solid;
  text-align: center;
  background-color: beige;
  width: 100%;
  height: 300px;
}

.stage.disabled {
  background-color: grey;
  font-size: 0px;
}

.stage.disabled .word {
  font-size: 0px;
}
</style>