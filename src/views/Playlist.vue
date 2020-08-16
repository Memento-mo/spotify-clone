<template>
  <section class="grid">
    <Sidebar class="sidebar" />
    <Burger class="burger" />
    <Loader v-if="isLoading" />
    <Main v-else>
      <HeadPlaylist :detailsPlaylist="user.detailsPlaylist" />
      <Tracks :tracks="user.tracksFromPlaylist" />
    </Main>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import * as TYPES from '@/store/types'
import Sidebar from '@/containers/Sidebar'
import Loader from '@/components/Loader'
import Tracks from '@/components/Tracks'
import Main from '@/containers/Main'
import HeadPlaylist from '@/components/HeadPlaylist'
import Burger from '@/components/Burger'

export default Vue.extend({
  computed: mapState(['isLoading', 'user']),
  watch: {
    $route(to) {
      this.playlistsViews({ id: to.params.id })
    }
  },
  methods: {
    ...mapActions({
      playlistsViews: TYPES.PLAYLIST_VIEWS
    })
  },
  components: {
    Sidebar,
    Loader,
    Tracks,
    Main,
    HeadPlaylist,
    Burger
  },
  mounted() {
    const { id } = (this.$router as any).history.current.params
    if (id) {
      this.playlistsViews({ id })
    }
    console.log(this.user)
  }
})
</script>
