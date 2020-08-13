<template>
  <section class="profile">
    <div class="profile_avatar">
      <div class="profile_avatar-img" :style="сAvatarBackground" />
    </div>
    <div class="profile_info">
      <span class="profile_info-user">Пользователь</span>
      <h3 class="profile_info-user_name">
        {{ cName }}
      </h3>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['user'],
  computed: {
    сAvatarBackground() {
      if (
        this.profileLocal === null ||
        this.profileLocal.images.length === 0
      ) {
        return {
          backgroundImage: `url(/img/person.5c0ada23.svg)`
        }
      }
      return {
        backgroundImage: `url(${this.profileLocal.images[0].url})`
      }
    },
    cName() {
      if (this.profileLocal === null) return 'Гость'

      return this.profileLocal.display_name
    }
  },
  data() {
    return {
      profileLocal: null
    }
  },
  mounted() {
    if (this.user.images) this.profileLocal = this.user
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

@media screen and (max-width: 1200px) {
  .profile_avatar-img {
    height: 135px;
    width: 146px;
  }

  .profile_info {
    font-size: 10px;
  }

  .profile_info-user_name {
    font-size: 24px;
  }
}

@media screen and (max-width: 992px) {
  .profile_avatar-img {
    height: 115px;
    width: 126px;
  }

  .profile_info {
    font-size: 8px;
  }

  .profile_info-user_name {
    font-size: 20px;
  }
}

@media screen and (max-width: 768px) {
  .profile {
    flex-direction: column;
    align-items: center;
  }

  .profile_info {
    margin-left: 0;
  }
  .profile_info-user {
    display: none;
  }
}

@media screen and (max-width: 400px) {
  .profile_info-user_name {
    font-size: 14px;
  }
}
</style>
