import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Lang, StimulusResponse, TestResult } from '@/data/types'

export const useExamHistoryStore = defineStore('examHistory', () => {
  const index = ref(0)
  const results: Ref<TestResult[]> = ref([])

  function publish(responses: StimulusResponse[], lang: Lang) {
    results.value.push({
      index: index.value++,
      dateMs: Date.now(),
      responses,
      lang,
    })
  }

  return { results, publish }
},{
  persist: true,
},)
