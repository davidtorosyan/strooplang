<script setup lang="ts">

import { langRecords } from '@/data/colors';
import type { TestResultInfo } from '@/data/types';
import { useExamHistoryStore } from '@/stores/examHistory'
import { computeStats } from '@/utils/stats';
import { computed, type ComputedRef } from 'vue';

const examHistory = useExamHistoryStore()

const examResults: ComputedRef<TestResultInfo[]> = computed(() => examHistory.results.slice(0).reverse().map(r => ({
  ...r,
  stats: computeStats(r),
})))

function formatDate(dateMs: number): string {
  const date = new Date(dateMs)
  return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" })
}

</script>

<template>
  <h3>
    Results
  </h3>
  <div class="results">
    <table v-if="examResults.length > 0">
      <tr>
        <th>Date</th>
        <th>Language</th>
        <th>Baseline</th>
        <th>Interference</th>
      </tr>
      <tr v-for="result in examResults" :key="result.index">
        <td>{{ formatDate(result.dateMs) }}</td>
        <td>{{ langRecords[result.lang].name }}</td>
        <td v-if="result.stats">{{ result.stats.congruentMeanDurationMs }} ms</td>
        <td v-if="result.stats">{{ (result.stats.deltaPercent * 100).toFixed(0) }}%</td>
        <td v-else colspan="100%">Invalid responses!</td>
      </tr>
    </table>
    <span v-else>No results yet!</span>
  </div>
</template>

<style scoped>
.results {
  height: 300px;
}

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