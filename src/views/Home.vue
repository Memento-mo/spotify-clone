<template>
  <section class="home"></section>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { fetchToken, tokenExpirationCheck } from '@/service/spotify'
import * as TYPES from '@/store/types'

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
  }
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.router-link {
  display: block;
  width: 10%;
}
</style>
