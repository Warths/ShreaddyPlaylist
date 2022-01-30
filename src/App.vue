<template>
  <!-- OPTIONS -->
  <transition name="fade"> 
    <div @click="toggleShowOptions(false)" v-if="showOptions" class="options-veil"></div>
  </transition>
  <transition name="slide">
    <div v-if="showOptions" class="options-menu text-light">
      <div class="d-flex align-items-center m-3">
        <button @click="toggleShowOptions(false)" type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        <h4 class="m-0 ms-2">Options</h4>
      </div>
      <option-list/>
      <div class="d-flex justify-content-center">
        <button @click="disconnect" type="button" class="btn btn-danger">Déconnexion</button>
      </div>
   </div>
  </transition>

  <Navigation 
    @toggleOptions="toggleShowOptions()" 
    :userLevel="userLevel" 
    :userData="userData" 
  />
  <router-view 
    :userLevel="userLevel"
  />
</template>

<script>
import {mapGetters, mapMutations, mapActions, mapState} from "vuex"
import Navigation from "./components/NavigationElements/Navigation.vue"
import OptionList from './components/Options/OptionList.vue'
import UrlUtils from './mixins/UrlUtils.vue'

export default {
  components: {Navigation, OptionList},
  mixins: [UrlUtils],
  computed: {
      ...mapGetters(["option", "userLevel"]),
      ...mapState(["identity", "userData", "showOptions"])
  },
  methods: { 
    ...mapMutations(["updateOption", "toggleShowOptions"]),
    ...mapActions(["setStartupTheme", "setIdentity", "disconnect", "init"]),
  },
  beforeMount() {
    this.init()
    this.setStartupTheme()
    let token = this.getHashValue("access_token")
    if (token == null) {
        token = this.getCookie("access_token")
    }
    // Managing session
    if (token != null) {
      // Validating Session
      this.setIdentity(token)
    }
  }
}
</script>

<style>
body {
  overflow-x:hidden;
}
body.dark-theme {
 background-color: rgb(31, 31, 31);
}

.animate-bg {
  transition: background-color, 1s
}

body.streamer-theme {
  background-color: rgb(85, 85, 85)
}

/* VEIL APPARITION ANIMATION */


.options-veil {
    position:fixed;
    z-index: 2000;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
}

.options-menu {
    backdrop-filter: blur(5px);
    position:absolute;
    z-index: 2001;
    left: calc(100% - 300px);
    min-height: 100vh;
    width: 300px;
    background: rgba(0,0,0,0.75);
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease
}

/* OPTION MENU ANIMATION */

.slide-enter-from, .slide-leave-to {
    left: 100%;
}

.slide-enter-to, .slide-leave-from {
    left: calc(100% - 300px);
}

.slide-enter-active, .slide-leave-active {
    transition: left 0.5s ease;
}

</style>