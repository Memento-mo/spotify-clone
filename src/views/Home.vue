<template>
  <section class="home">
    <Sidebar />
    <Main />
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { fetchToken, tokenExpirationCheck } from '@/service/spotify'
import * as TYPES from '@/store/types'
import Sidebar from '@/containers/Sidebar'
import Main from '@/containers/Main'

export default Vue.extend({
  computed: mapState(['myPlaylists', 'myProfile']),
  methods: {
    ...mapActions({
      fetchInit: TYPES.FETCH_INIT
    })
  },
  async mounted() {
    try {
      if (window.location.search) {
        await fetchToken()
        window.location.search = ''
      }

      await tokenExpirationCheck()
      this.fetchInit()
    } catch (error) {
      this.$router.push('/login')
    }
  },
  components: {
    Sidebar,
    Main
  }
})
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
}
</style>
