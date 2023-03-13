<script setup lang="ts">
import { colorRecords } from '@/data/colors';
</script>

<template>
  <h3>
    Instructions
  </h3>
  <div>
    <p>Choose a language and hit start.</p>
    <p>When a word appears, select what color you see (not what word you read).</p>
    <p>For example, if you see <span class="red">green</span> you should hit the red button.</p>
  </div>
  <h3>
    Explanation
  </h3>
  <div>
    <p>
      This is an experiment that demonstrates the
      <a href="https://en.wikipedia.org/wiki/Stroop_effect">Stroop Effect</a>.
    </p>
    <p>
      In this case, it's when reading a word gets in the way of identifying its color.
    </p>
    <p>
      Try it in a language you don't read; it probably won't affect you.
    </p>
  </div>
</template>

<style scoped>
.red {
  color: v-bind("colorRecords['red'].hex")
}
</style>