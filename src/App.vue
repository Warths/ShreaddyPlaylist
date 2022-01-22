<template>
  <!-- OPTIONS -->
  <transition name="fade"> 
    <div @click="showOptions = False" v-if="showOptions" class="options-veil"></div>
  </transition>
  <transition name="slide">
    <div v-if="showOptions" class="options-menu text-light">
      <div class="d-flex align-items-center m-3">
        <button @click="showOptions = False" type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        <h4 class="m-0 ms-2">Options</h4>
      </div>
      <option-list :userLevel="userLevel"/>
      <div class="d-flex justify-content-center">
        <button @click="disconnect" type="button" class="btn btn-danger">Déconnexion</button>
      </div>
   </div>
  </transition>

  <Navigation 
    @toggleOptions="showOptions = !showOptions" 
    :identity="identity" 
    :userLevel="userLevel" 
    :userData="userData" 
  />
  <router-view 
    :userLevel="userLevel"
    :identity="identity"
  />
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex"
import Navigation from "./components/NavigationElements/Navigation.vue"
import OptionList from './components/Options/OptionList.vue'
import UrlUtils from './mixins/UrlUtils.vue'

export default {
  data() {
    return {
        identity: null,
        userData: null,
        devTools: false,
        showOptions: false
    }
  },
  components: {Navigation, OptionList},
  mixins: [UrlUtils],
  computed: {
      ...mapGetters(["option"]),
      userLevel() {
        if (this.identity == null) {
            return 0
        }
        if (this.moderators.includes(this.identity.login)) {
            return 2
        }
        return 1
      }
  },
  methods: { 
    ...mapMutations(["updateOption"]),
    ...mapActions(["setStartupTheme"]),
    setIdentity(token) {
      // Checking if token is valid
      let headers = {"Authorization": `Bearer ${token}`};
      fetch("https://id.twitch.tv/oauth2/validate", {headers})
      .then(response => response.json())
      .then(data => {
        // Check if there's a client ID in response
        if (!data.hasOwnProperty("client_id")) {
            throw new Error("Session invalide. Loggez-vous à nouveau. Si le problème persiste, contactez un administrateur")
        }
        // Check If client ID corresponds to the app
        if (data.client_id != this.clientId) {
          throw new Error("Session invalide, car delivrée par une application tierce.")
        }
        this.identity = data
        this.setCookie("access_token", token)
        return data
      })
      // Getting User Infos
      .then((user) => {
          headers["Client-Id"] = this.clientId
          fetch(`https://api.twitch.tv/helix/users?id=${user.user_id}`, {headers})
          .then(request => request.json())
          .then(data => {
              this.userData = data["data"][0]
          })
        }
      )
    },
    disconnect() {
        this.showOptions = false
        this.setCookie("access_token", null)
        this.identity = null
        this.userData = null

    }
  },
  beforeMount() {
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
    z-index: 5;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
}

.options-menu {
    backdrop-filter: blur(5px);
    position:absolute;
    z-index: 10;
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