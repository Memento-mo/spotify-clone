<template>
  <section class="profile">
    <div class="profile_avatar">
      <div
        class="profile_avatar-img"
        :style="{
          backgroundImage:
            `url(${user.myProfile.images[0].url})` || null
        }"
      />
    </div>
    <div class="profile_info">
      <span class="profile_info-user">Пользователь</span>
      <h3 class="profile_info-user_name">{{ user.myProfile.display_name }}</h3>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  computed: mapState(['user']),
  mounted() {
    console.log(this.user.myProfile)
  }
})
</script>

<style scoped>
.profile {
  display: flex;
}
.profile_avatar {
  max-width: 300px;
}
.profile_avatar-img {
  height: 165px;
  width: 176px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  box-shadow: 0px 8px 10px 2px rgba(0, 0, 0, 1);
}
.profile_info {
  margin-left: 20px;
  font-size: 12px;
  font-weight: 600;
  padding-top: 20px;
}

.profile_info-user {
  text-transform: uppercase;
}

.profile_info-user_name {
  margin-top: 10px;
  font-size: 30px;
}
</style>
