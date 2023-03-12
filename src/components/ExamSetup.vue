<script setup lang="ts">
import { ref } from 'vue'
import { langSet } from '@/data/sets';
import { useExamSettingsStore } from '@/stores/examSettings'
import { langRecords } from '@/data/colors';

const examSettings = useExamSettingsStore()

const langOptions = ref(langSet.map((choice) => ({
  text: langRecords[choice].name,
  value: choice
})))

</script>

<template>
  <h3>
    Setup
  </h3>
  <div>
    <select v-model="examSettings.lang">
      <option v-for="option in langOptions" :value="option.value" :key="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>