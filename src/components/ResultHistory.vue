<script setup lang="ts">

import { langRecords } from '@/data/colors';
import type { TestResultInfo } from '@/data/types';
import { useExamHistoryStore } from '@/stores/examHistory'
import { computeStats } from '@/utils/stats';
import { computed, type ComputedRef } from 'vue';

const examHistory = useExamHistoryStore()

const examResults: ComputedRef<TestResultInfo[]> = computed(() => examHistory.results.map(r => ({
  ...r,
  stats: computeStats(r),
})))

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
}

</script>

<template>
  <h3>
    Results
  </h3>
  <div>
    <table v-if="examResults.length > 0" class="results">
      <tr>
        <th>Date</th>
        <th>Language</th>
        <th>Interference</th>
      </tr>
      <tr v-for="result in examResults" :key="result.index">
        <td>{{ formatDate(result.date) }}</td>
        <td>{{ langRecords[result.lang].name }}</td>
        <td v-if="result.stats">{{ result.stats.deltaPercent * 100 }}%</td>
        <td v-else colspan="100%">Invalid responses!</td>
      </tr>
    </table>
    <span v-else>No results yet!</span>
  </div>
</template>

<style scoped>
table,
th,
td {
  border-style: solid;
}

th {
  font-weight: bold;
}

th,
td {
  padding: 5px;
}
</style>