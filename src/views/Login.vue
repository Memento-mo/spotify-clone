<template>
  <section class="login">
    <Back />
    <div class="login_logo">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        class="login_logo-img"
      />
    </div>
    <div class="login_button">
      <Button :href="authUrl">Войти</Button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '@/components/Button'
import Back from '@/components/Back'
import { authUrl } from '@/service/spotify'

export default Vue.extend({
  data() {
    return {
      authUrl
    }
  },
  components: {
    Button,
    Back
  }
})
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
.login_logo {
  width: 50%;
}

.login_logo-img {
  width: 100%;
}

.login_button {
  margin-top: 100px;
}
</style>
