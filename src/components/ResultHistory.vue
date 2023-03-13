<script setup lang="ts">

import { useExamHistoryStore } from '@/stores/examHistory'

const examHistory = useExamHistoryStore()

</script>

<template>
  <h3>
    Results
  </h3>
  <div>
    <table>
      <tr>
        <th>Result</th>
      </tr>
      <tr v-for="result in examHistory.results" :key="result.index">
        <td>{{ result }}</td>
      </tr>
    </table>
  </div>
</template>