<template>
  <aside class="sidebar">
    <div class="page-home">
      <img src="../icons/home.svg" class="house-icon" />
      <router-link to="/">
        <span @click="closeMenu(false)">Главная</span>
      </router-link>
    </div>
    <SidePlaylists />
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import SidePlaylists from '@/components/SidePlaylists'
import { mapActions, mapMutations } from 'vuex'
import * as TYPES from '@/store/types'
export default Vue.extend({
  methods: {
    ...mapActions({
      homeViews: TYPES.HOME_VIEWS
    }),
    ...mapMutations({
      closeMenu: TYPES.MENU
    })
  },
  components: {
    SidePlaylists
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

@media screen and (max-width: 1200px) {
  .house-icon {
    margin-right: 10px;
  }
}
</style>
