import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Color, Stimulus, StimulusResponse } from '@/data/types'
import { createStimuli } from '@/utils/stimuli'
import { useExamHistoryStore } from './examHistory'
import { useExamSettingsStore } from './examSettings'
import { Timer } from '@/utils/timer'

export const useExamStateStore = defineStore('examState', () => {
  const examSettings = useExamSettingsStore()
  const examHistory = useExamHistoryStore() 

  const running = ref(false)
  const stimuli: Ref<Stimulus[]> = ref([])
  const responses: Ref<StimulusResponse[]> = ref([])
  const index = ref(0)

  const timer = new Timer()

  function start() {
    stimuli.value = createStimuli()
    running.value = true
    timer.reset()
  }
  
  function stop() {
    running.value = false
  
    if (responses.value.length > 0 && responses.value.length === stimuli.value.length) {
      examHistory.publish(responses.value, examSettings.lang)
    }
  
    stimuli.value = []
    responses.value = []
    index.value = 0
  }

  function respond(color: Color) {
    responses.value.push({
      index: index.value,
      stimulus: stimuli.value[index.value],
      guess: color,
      durationMs: timer.elapsedMs(),
      correct: stimuli.value[index.value].visual === color,
    })
    index.value++
    timer.reset()
  
    if (index.value === stimuli.value.length) {
      stop()
    }
  }

  return { running,stimuli, responses, index, start, stop, respond }
})
