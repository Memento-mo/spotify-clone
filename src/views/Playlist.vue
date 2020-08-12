<template>
  <section class="grid">
    <Sidebar />
    <Loader v-if="isLoading" />
    <Main v-else>
      <HeadPlaylist
        :img="user.detailsPlaylist.images[0]"
        :name="user.detailsPlaylist.name"
      />
      <Tracks :tracks="user.detailsPlaylist.tracks || []" />
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

export default Vue.extend({
  computed: mapState(['isLoading', 'user']),
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
    HeadPlaylist
  },
  mounted() {
    const { id } = (this.$router as any).history.current.params
    if (id) {
      this.playlistsViews(id)
    }
  }
})
</script>
