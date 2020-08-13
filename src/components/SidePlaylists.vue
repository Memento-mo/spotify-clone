<template>
  <section class="side-playlists">
    <h3 class="description-title">Плейлисты</h3>
    <ul
      class="description-title side-item"
      v-for="playlist in user.myPlaylists.items"
      :key="playlist.id"
    >
      <router-link :to="'/playlist/' + playlist.id">
        <li @click="closeMenu(false)">{{ playlist.name }}</li>
      </router-link>
    </ul>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as TYPES from '@/store/types'
export default {
  methods: {
    ...mapMutations({
      closeMenu: TYPES.MENU
    })
  },
  computed: mapState(['user'])
}
</script>

<style scoped>
.side-item {
  margin-top: 10px;
  text-transform: initial;
  cursor: pointer;
}
</style>
