<template>
  <Slide
    :isOpen="isOpen"
    @openMenu="openMenu(true)"
    @closeMenu="closeMenu(false)"
  >
    <Sidebar />
  </Slide>
</template>
<script>
import { Slide } from 'vue-burger-menu'
import { mapState, mapMutations } from 'vuex'
import * as TYPES from '@/store/types'
import Sidebar from '@/containers/Sidebar'
export default {
  computed: mapState(['isOpen']),
  methods: {
    ...mapMutations({
      openMenu: TYPES.MENU,
      closeMenu: TYPES.MENU
    })
  },
  components: {
    Slide,
    Sidebar
  }
}
</script>

<style>
.bm-menu {
  padding-top: 0;
  background: rgba(18, 18, 18);
}
.bm-item-list > * {
  display: block;
}

.bm-burger-bars {
  background: #ffffff;
}

.line-style {
  height: 8%;
}

.bm-burger-button {
  top: 20px;
  left: 20px;
  width: 30px;
  height: 25px;
}
</style>
