<template>
  <div class="headplaylist">
    <img
      class="headplaylist_logo"
      :src="detailsLocal === null ? null : detailsLocal.images[0].url"
    />
    <div class="headplaylist_text">
      <h3 class="subtitle">Плейлист</h3>
      <h1 class="title">{{ detailsPlaylist.name }}</h1>

      <Button class="headplaylist_button listen-none-active"
        >Слушать</Button
      >
      <Button class="headplaylist_button play">
        <img src="../icons/play-svg.svg" alt="play" />
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Button from '@/components/Button'
export default Vue.extend({
  props: ['detailsPlaylist'],
  data() {
    return {
      detailsLocal: null
    }
  },
  mounted() {
    if ('images' in this.detailsPlaylist) {
      this.detailsLocal = this.detailsPlaylist
    }
  },
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

.headplaylist_logo {
  height: 256px;
  width: 256px;
}
.play {
  display: none;
}

@media screen and (max-width: 1200px) {
  .headplaylist_logo {
    height: 186px;
    width: 186px;
  }

  .subtitle {
    font-size: 10px;
  }

  .title {
    font-size: 24px;
  }

  .headplaylist_button {
    font-size: 12px;
    padding: 0.8em 2em;
  }
}

@media screen and (max-width: 576px) {
  .headplaylist {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .headplaylist_logo {
    height: 100px;
    width: 100px;
    display: none;
  }

  .subtitle {
    display: none;
  }

  .headplaylist_text {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-top: 20px;
    font-size: 14px;
  }

  .listen-none-active {
    display: none;
  }

  .play {
    padding: 0;
    height: 50px;
    width: 50px;
    margin-top: 20px;
    display: block;
  }

  .play img {
    position: relative;
    top: 16px;
    left: 2px;
    height: 16px;
  }
}
</style>
