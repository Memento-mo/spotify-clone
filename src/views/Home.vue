<template>
  <section class="grid">
    <Sidebar class="sidebar" />
    <Burger class="burger" />
    <Loader v-if="isLoading" />
    <Main v-else>
      <Profile :user="user.myProfile" />
      <Tracks :tracks="user.myLikedTracks" name="Любимые треки" />
    </Main>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import * as TYPES from '@/store/types'
import Sidebar from '@/containers/Sidebar'
import Main from '@/containers/Main'
import Profile from '@/components/Profile'
import Tracks from '@/components/Tracks'
import Loader from '@/components/Loader'
import Burger from '@/components/Burger'

export default Vue.extend({
  computed: mapState(['isLoading', 'user']),
  methods: {
    ...mapActions({
      homeViews: TYPES.HOME_VIEWS
    })
  },
  mounted() {
    try {
      this.homeViews()
    } catch (error) {
      console.log(error)
    }
  },
  components: {
    Sidebar,
    Main,
    Profile,
    Tracks,
    Loader,
    Burger
  }
})
</script>
