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
      <option-list :options="options" :userLevel="userLevel" v-on:updateOption="(event) => updateOption(event)"/>
      <div class="d-flex justify-content-center">
        <button @click="disconnect" type="button" class="btn btn-danger">Déconnexion</button>
      </div>
   </div>
  </transition>

  <Navigation 
    @toggleOptions="showOptions = !showOptions" 
    :options="options" 
    :identity="identity" 
    :userLevel="userLevel" 
    :userData="userData" 
  />
  <router-view 
    :options="options" 
    :userLevel="userLevel"
    :identity="identity"
  />
</template>

<script>
import {mapGetters} from "vuex"
import Navigation from "./components/NavigationElements/Navigation.vue"
import OptionList from './components/Options/OptionList.vue'
import UrlUtils from './mixins/UrlUtils.vue'

export default {
  data() {
    return {
        identity: null,
        userData: null,
        devTools: false,
        showOptions: false,
        options: {
            regular: {
                fields: {
                  requestForm: {
                    name: "options-request-form",
                    value: this.getCookieOrDefault("options-request-form", true, true),
                    text: "Formulaire de request"
                  },
                  lightmixCooldown: {
                    name: "options-lightmix-cooldown",
                    value: this.getCookieOrDefault("options-lightmix-cooldown", false, true),
                    text: "Temps de recharge LightMix"
                  },
                  displayPlaylistState: {
                    name: "options-display-playlist-state",
                    value: this.getCookieOrDefault("options-display-playlist-state", true, true),
                    text: "Affiche le statut de la playlist"
                  },
                  foldPlaylist: {
                    name: "options-fold-playlist",
                    value: this.getCookieOrDefault("options-fold-playlist", false, true),
                    text: "Replier la playlist"
                  },
                  darkTheme: {
                    name: "options-dark-theme",
                    value: this.getCookieOrDefault("options-dark-theme", false, true),
                    text: "Mode sombre",
                    on_update: this.setTheme
                  }
                },
                userLevel: 1
            },
            moderator: {
              fields: {
                /*
                search: {
                  name: "options-search",
                  value: this.getCookieOrDefault("options-search", false, true),
                  text: "Recherche"
                },
                */
                devTools: {
                  name: "options-devtools",
                  value: this.getCookieOrDefault("options-devtools", false, true),
                  text: "Outils de développement"
                },
                adminTools: {
                  name: "options-admintools",
                  value: this.getCookieOrDefault("options-admintools", this.prefersDarkTheme, true),
                  text: "Raccourcis de modération"
                },
                streamerTheme: {
                  name: "options-streamer-theme",
                  value: this.getCookieOrDefault("options-streamer-theme", false, true),
                  text: "Mode Streamer",
                  on_update: this.setStreamerMode
                }
              },
              userLevel: 2
            }
        }
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
      },
      prefersDarkTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
      }
  },
  methods: {
    setTheme(animate = true) {     
      if (animate) {
        document.body.classList.add("animate-bg")
      }   
      document.body.classList.remove('dark-theme')
      if (this.options.regular.fields.darkTheme.value) {
        document.body.classList.add('dark-theme')
      }
    },
    setStreamerMode() {
      document.body.classList.remove("streamer-theme")
      if (this.options.moderator.fields.streamerTheme.value) {
        document.body.classList.add("streamer-theme")
      }
    },
    updateOption(event) {
      this.options[event.group].fields[event.name].value = event.value
      let func = this.options[event.group].fields[event.name].on_update
      if (func) {func()}
    },
    showError(errorText) {
      return "NOT IMPLEMENTED"
    },
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
      .catch(error => {
          // Error Management TODO
          this.showError(error.message)
      })
    },
    disconnect() {
        this.showOptions = false
        this.setCookie("access_token", null)
        this.identity = null
        this.userData = null

    }
  },
  beforeMount() {
    this.setTheme(false)
    this.setStreamerMode()
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