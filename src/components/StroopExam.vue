<script setup lang="ts">
import { ref } from 'vue'

const word = ref('RED')
const color = ref('red')
</script>

<template>
  <span :class="color">{{ word }}</span>
</template>

<style scoped>
.red {
  color: red
}
</style>