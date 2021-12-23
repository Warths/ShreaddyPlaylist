<template>
    <div class="align-items-center d-flex">
    <a class="nav-link p-0">{{displayName}}</a>
    <img v-if="userData != null" :src="avatar" class="ms-2 rounded sized-1 d-inline-block align-text-top" alt="Votre photo de profil"/>
    </div>
</template>

<script>
export default {
    computed: {
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