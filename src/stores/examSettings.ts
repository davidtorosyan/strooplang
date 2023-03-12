import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Lang } from '@/data/types'

export const useExamSettingsStore = defineStore('examSettings', () => {
  const lang: Ref<Lang> = ref('en')

  return { lang }
})
