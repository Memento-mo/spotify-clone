<template>
  <a :href="href" class="button"><slot></slot></a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    href: {
      type: String,
      default: () => '#'
    }
  }
})
</script>

<style scoped>
.button {
  padding: 1.2em 3em;
  background: #1db954;
  font-weight: bold;
  border-radius: 100px;
  display: block;
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  user-select: none;
}

.button:hover {
  -webkit-transform: scale(1.04);
  transform: scale(1.04);
}
</style>
