<template>
    <transition name="fade">
    <div v-if="ready" class="align-items-center d-flex">
        <a class="nav-link p-0">{{displayName}}</a>
        <img v-if="userData != null" :src="avatar" class="ms-2 rounded sized-1 d-inline-block align-text-top" alt="Votre photo de profil"/>
    </div>
    </transition>
</template>

<script>
export default {
    computed: {
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
    props: ["identity", "userData"],
}
</script>