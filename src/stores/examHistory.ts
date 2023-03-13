import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { StimulusResponse, TestResult } from '@/data/types'

export const useExamHistoryStore = defineStore('examHistory', () => {
  const index = ref(0)
  const results: Ref<TestResult[]> = ref([])

  function publish(responses: StimulusResponse[]) {
    results.value.push({
      index: index.value++,
      responses,
    })
  }

  return { results, publish }
})
