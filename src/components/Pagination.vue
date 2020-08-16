<template>
  <div class="pagination">
    <div
      class="pagination__arrow left"
      v-show="this.previous === null ? false : true"
      @click="prevPage"
    ></div>
    <div
      class="pagination__arrow right"
      v-show="this.next === null ? false : true"
      @click="nextPage"
    ></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as TYPES from '@/store/types'

export default {
  props: ['next', 'previous'],
  methods: {
    ...mapActions({
      playlistsViews: TYPES.PLAYLIST_VIEWS
    }),
    nextPage() {
      if (this.next) {
        const id = this.$router.history.current.params.id
        this.playlistsViews({ url: this.next, id })
      }
    },
    prevPage() {
      if (this.previous) {
        const id = this.$router.history.current.params.id
        this.playlistsViews({ url: this.previous, id })
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  width: 91%;
  position: relative;
  left: 12px;
  margin-top: 20px;
}

.pagination__arrow {
  cursor: pointer;
  height: 10px;
  width: 10px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
}

.left {
  transform: rotate(230deg);
  position: relative;
}

.right {
  transform: rotate(40deg);
  position: relative;
  left: 100%;
}
</style>
