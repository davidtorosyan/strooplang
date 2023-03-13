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
        <th>Matching Name</th>
        <th>Different Name</th>
        <th>Time increase</th>
        <th>Interference</th>
      </tr>
      <tr v-for="result in examResults" :key="result.index">
        <td>{{ result.date }}</td>
        <td>{{ langRecords[result.lang].name }}</td>
        <td v-if="result.stats">{{ result.stats.congruentMeanDurationMs }} ms</td>
        <td v-if="result.stats">{{ result.stats.incongruentMeanDurationMs }} ms</td>
        <td v-if="result.stats">{{ result.stats.deltaMs }} ms</td>
        <td v-if="result.stats">{{ result.stats.deltaPercent * 100 }}%</td>
        <td v-else colspan="100%">Not enough correct responses!</td>
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