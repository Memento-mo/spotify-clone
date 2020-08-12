<template>
  <aside class="sidebar">
    <div class="page-home">
      <div class="house-icon" />
      <router-link to="/">
        <!-- Главная -->
        <li @click="homeViews()">Главная</li>
      </router-link>
    </div>
    <SidePlaylists />
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import SidePlaylists from '@/components/SidePlaylists'
import { mapActions } from 'vuex'
import * as TYPES from '@/store/types'
export default Vue.extend({
  components: {
    SidePlaylists
  },
  methods: {
    ...mapActions({
      homeViews: TYPES.HOME_VIEWS
    })
  }
})
</script>

<style scoped>
.sidebar {
  padding: 20px;
  flex-basis: 12%;
  background-color: rgb(18, 18, 18);
}

.house-icon {
  height: 20px;
  width: 20px;
  mask-image: url('../icons/home.svg');
  background: #fff;
}

.page-home {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45%;
  margin-top: 50px;
  margin-bottom: 70px;
  font-size: 14px;
  opacity: 0.6;
  font-weight: 600;
}
</style>
