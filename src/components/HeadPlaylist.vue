<template>
  <div class="headplaylist">
    <img
      :src="img.url"
      :style="{
        height: img.height / 2.5 + 'px',
        width: img.width / 2.5 + 'px'
      }"
    />
    <div class="headplaylist_text">
      <h3 class="subtitle">Плейлист</h3>
      <h1 class="title">{{ name }}</h1>

      <Button class="headplaylist_button">Слушать</Button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Button from '@/components/Button'
export default Vue.extend({
  props: ['img', 'name'],
  components: {
    Button
  }
})
</script>

<style scoped>
.headplaylist {
  display: flex;
  align-items: flex-end;
}

.headplaylist_text {
  margin-left: 20px;
}

.title {
  margin-top: 10px;
  font-size: 40px;
}

.subtitle {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
}

.headplaylist_button {
  padding: 0.8em 3em;
  width: 100px;
}
</style>
