<script setup lang="ts">
import { colorRecords } from '@/data/colors';
import { colorSet } from '@/data/sets';
import { useExamStateStore } from '@/stores/examState';

const examState = useExamStateStore()
</script>

<template>
  <div class="controls">
    <table>
      <tr>
        <td v-for="choice in colorSet" :key="choice">
          <button :disabled="!examState.running" @click="examState.respond(choice)"
            :style="`background-color: ${colorRecords[choice].hex};`">
            {{ choice }}
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
  background-color: grey;
}

tr {
  width: 100%;
}

td {
  padding: 10px;
}

.controls button {
  border: black;
  border-style: solid;
  border-width: 5px;
  font-size: 0;
  width: 100%;
  height: 50px;
}
</style>