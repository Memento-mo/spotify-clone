<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { fetchToken, tokenExpirationCheck } from '@/service/spotify'
import { mapActions } from 'vuex'
import * as TYPES from '@/store/types'

export default Vue.extend({
  methods: {
    ...mapActions({
      fetchInit: TYPES.FETCH_INIT
    })
  },
  async mounted() {
    try {
      if (window.location.search) {
        await fetchToken()
        this.$router.push('/')
      }

      await tokenExpirationCheck()
    } catch (error) {
      this.$router.push('/login')
    }
  },
  async updated() {
    try {
      await tokenExpirationCheck()
    } catch (error) {
      this.$router.push('/login')
    }
  }
})
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Roboto';
  letter-spacing: 1.5px;
}
button,
button:active {
  outline: none;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #fff;
}

#app {
  background: rgba(3, 2, 2, 0.92);
  height: 100vh;
  color: #fff;
}

li {
  list-style-type: none;
}

.description-title {
  font-size: 13px;
  opacity: 0.6;
  text-transform: uppercase;
  font-weight: 300;
}
.grid {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.burger {
  display: none;
}

@media screen and (max-width: 992px) {
  .sidebar {
    display: none;
  }
  .burger {
    display: block;
  }
}
</style>
