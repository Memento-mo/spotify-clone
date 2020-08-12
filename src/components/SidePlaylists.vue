<template>
  <section class="side-playlists">
    <h3 class="description-title">Плейлисты</h3>
    <ul
      class="description-title side-item"
      v-for="playlist in user.myPlaylists.items"
      :key="playlist.id"
    >
      <router-link :to="'/playlist/' + playlist.id">
        <li @click="playlistsViews(playlist.id)">{{ playlist.name }}</li>
      </router-link>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import * as TYPES from '@/store/types'
export default Vue.extend({
  computed: mapState(['user']),
  methods: {
    ...mapActions({
      playlistsViews: TYPES.PLAYLIST_VIEWS
    })
  }
})
</script>

<style scoped>
.side-item {
  margin-top: 10px;
  text-transform: initial;
  cursor: pointer;
}
</style>
