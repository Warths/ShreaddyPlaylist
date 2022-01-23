<template>
    <transition name="fade">
    <div v-if="ready" class="align-items-center d-flex">
        <span class="text-dark p-0">{{displayName}}</span>
        <img v-if="userData != null" :src="avatar" class="ms-2 rounded sized-1 d-inline-block align-text-top" alt="Votre photo de profil"/>
    </div>
    </transition>
</template>

<script>
import {mapState} from "vuex"
export default {
    computed: {
      ...mapState(["identity", "userData"]),
      ready() {
        return this.userData != null
      },
      displayName() {
        if (this.userData != null) {
            return this.userData.display_name
        } else {
            return this.identity.login
        }
      },
      avatar() {
        return this.userData.profile_image_url
      }
    },
}
</script>

<style scoped>
span {
  transition: color 1s
}

.streamer-theme span,
.dark-theme span {
  color: rgb(241, 241, 241)!important;
}
</style>
